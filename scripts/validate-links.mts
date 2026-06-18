import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(rootDir, "apps/web/out");
const contentDir = join(rootDir, "apps/web/src/lib/content");
const sitemapPath = join(outDir, "sitemap.xml");

const GENERIC_LINKEDIN_URL = /https:\/\/www\.linkedin\.com\/?["']/;

function readContentSource() {
  const chunks: string[] = [];

  function walk(directory: string) {
    for (const entry of readdirSync(directory)) {
      const fullPath = join(directory, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.endsWith(".ts")) {
        chunks.push(readFileSync(fullPath, "utf8"));
      }
    }
  }

  walk(contentDir);
  return chunks.join("\n");
}

function collectExternalUrls(siteSource: string) {
  const urls = new Set<string>();
  const urlPattern = /https?:\/\/[^\s"'`<>]+/g;
  let match = urlPattern.exec(siteSource);

  while (match) {
    const url = match[0].replace(/[),.;]+$/, "");
    if (!url.includes("nextjs.org") && !url.includes("github.com/once-ui")) {
      urls.add(url);
    }
    match = urlPattern.exec(siteSource);
  }

  return [...urls];
}

function collectHtmlFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
      continue;
    }

    if (entry.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFromHtmlFile(filePath: string) {
  const relative = posix.relative(outDir.replaceAll("\\", "/"), filePath.replaceAll("\\", "/"));

  if (relative === "index.html") {
    return "/";
  }

  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"/index.html".length)}`;
  }

  if (relative.endsWith(".html")) {
    return `/${relative.slice(0, -".html".length)}`;
  }

  return `/${relative}`;
}

function resolveInternalPath(route: string) {
  if (route === "/") {
    return join(outDir, "index.html");
  }

  const directAsset = join(outDir, route.slice(1));
  if (route.includes(".") && existsSync(directAsset)) {
    return directAsset;
  }

  const nestedIndex = join(outDir, route.slice(1), "index.html");
  if (existsSync(nestedIndex)) {
    return nestedIndex;
  }

  return join(outDir, `${route.slice(1)}.html`);
}

function parseSitemapRoutes() {
  if (!existsSync(sitemapPath)) {
    return [];
  }

  const xml = readFileSync(sitemapPath, "utf8");
  const routes: string[] = [];
  const locPattern = /<loc>([^<]+)<\/loc>/g;
  let match = locPattern.exec(xml);

  while (match) {
    const url = new URL(match[1] ?? "");
    routes.push(url.pathname === "" ? "/" : url.pathname);
    match = locPattern.exec(xml);
  }

  return routes;
}

function shouldValidateInternalLink(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return false;
  }

  if (href.startsWith("/_next/")) {
    return false;
  }

  const pathOnly = href.split("#")[0]?.split("?")[0] ?? href;
  if (!pathOnly || pathOnly === "/") {
    return false;
  }

  if (pathOnly.includes(".")) {
    const assetPath = join(outDir, pathOnly.slice(1));
    if (existsSync(assetPath)) {
      return false;
    }

    return true;
  }

  return true;
}

function extractHrefValues(html: string) {
  const hrefPattern = /href="([^"]+)"/g;
  const values: string[] = [];
  let match = hrefPattern.exec(html);

  while (match) {
    values.push(match[1] ?? "");
    match = hrefPattern.exec(html);
  }

  return values;
}

async function fetchUrl(url: string, method: "HEAD" | "GET") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: method === "GET" ? { Range: "bytes=0-0" } : undefined,
    });

    return response.status;
  } catch (error) {
    return error instanceof Error ? error.message : "request failed";
  } finally {
    clearTimeout(timeout);
  }
}

async function checkExternalUrl(url: string) {
  const headStatus = await fetchUrl(url, "HEAD");

  if (typeof headStatus === "number" && headStatus < 400) {
    return null;
  }

  if (headStatus === 405 || headStatus === 403) {
    const getStatus = await fetchUrl(url, "GET");
    if (typeof getStatus === "number" && getStatus < 400) {
      return null;
    }

    if (typeof getStatus === "number") {
      return `returned ${getStatus} on GET fallback`;
    }

    return getStatus;
  }

  if (typeof headStatus === "number") {
    const getStatus = await fetchUrl(url, "GET");
    if (typeof getStatus === "number" && getStatus < 400) {
      return null;
    }

    if (typeof getStatus === "number") {
      return `returned ${headStatus} (HEAD) and ${getStatus} (GET)`;
    }

    return `HEAD returned ${headStatus}; GET failed: ${getStatus}`;
  }

  const getStatus = await fetchUrl(url, "GET");
  if (typeof getStatus === "number" && getStatus < 400) {
    return null;
  }

  if (typeof getStatus === "number") {
    return `returned ${getStatus} on GET fallback`;
  }

  return `HEAD failed (${headStatus}); GET failed (${getStatus})`;
}

async function mapConcurrent<T>(
  items: readonly T[],
  concurrency: number,
  mapper: (item: T) => Promise<void>,
) {
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = items[index];
      index += 1;
      if (current !== undefined) {
        await mapper(current);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
}

async function main() {
  const errors: string[] = [];
  const siteSource = readContentSource();

  if (!existsSync(outDir)) {
    console.error("validate-links: build output not found. Run `pnpm build` first.");
    process.exit(1);
  }

  if (GENERIC_LINKEDIN_URL.test(siteSource)) {
    errors.push("lib/content contains a generic LinkedIn homepage URL");
  }

  for (const route of parseSitemapRoutes()) {
    const filePath = resolveInternalPath(route);
    if (!existsSync(filePath)) {
      errors.push(`Missing build output for sitemap route ${route}`);
    }
  }

  const htmlFiles = collectHtmlFiles(outDir);
  for (const filePath of htmlFiles) {
    const html = readFileSync(filePath, "utf8");
    const route = routeFromHtmlFile(filePath);

    for (const href of extractHrefValues(html)) {
      if (!shouldValidateInternalLink(href)) {
        continue;
      }

      const pathOnly = href.split("#")[0]?.split("?")[0] ?? href;

      const target = resolveInternalPath(pathOnly);
      if (!existsSync(target)) {
        errors.push(`Broken internal link ${href} on ${route}`);
      }
    }
  }

  const externalUrls = collectExternalUrls(siteSource);

  await mapConcurrent(externalUrls, 5, async (url) => {
    if (GENERIC_LINKEDIN_URL.test(`${url}"`)) {
      errors.push(`Placeholder external URL configured: ${url}`);
      return;
    }

    const failure = await checkExternalUrl(url);
    if (failure) {
      errors.push(`External URL check failed for ${url}: ${failure}`);
    }
  });

  const resumePath = join(rootDir, "apps/web/public/resume.pdf");
  if (!existsSync(resumePath)) {
    errors.push("Missing resume asset at /resume.pdf");
  }

  if (errors.length > 0) {
    console.error("validate-links failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `validate-links passed (${parseSitemapRoutes().length} sitemap routes, ${externalUrls.length} external URLs).`,
  );
}

await main();
