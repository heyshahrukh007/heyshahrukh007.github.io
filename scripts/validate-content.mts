import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(rootDir, "apps/web/src/lib/content");

const PLACEHOLDER_ORGANIZATIONS = ["Tech Company", "Digital Solutions Ltd."];
const GENERIC_LINKEDIN_URL = /https:\/\/www\.linkedin\.com\/?["']/;
const GITHUB_PROFILE_ONLY_SOURCE = /source:\s*"https:\/\/github\.com\/[^/"]+\/?"/;

function readContentSource(): string {
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

function main() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const siteSource = readContentSource();

  if (!/name:\s*"[^"]+"/.test(siteSource)) {
    errors.push("site.name is missing");
  }

  if (!/role:\s*"[^"]+"/.test(siteSource)) {
    errors.push("site.role is missing");
  }

  const projectSlugs = [...siteSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1] ?? "");
  if (projectSlugs.length === 0) {
    errors.push("projects.items appears empty");
  }

  if (GENERIC_LINKEDIN_URL.test(siteSource)) {
    errors.push("lib/content contains a generic LinkedIn homepage URL");
  }

  if (GITHUB_PROFILE_ONLY_SOURCE.test(siteSource)) {
    errors.push("A project source URL points to a GitHub profile instead of a repository");
  }

  const socialLinksSection =
    siteSource.match(/export const socialLinks = \[([\s\S]*?)\] as const;/)?.[1] ?? "";

  if (/enabled:\s*false/.test(socialLinksSection)) {
    warnings.push("Disabled social profile entries remain in socialLinks");
  }

  for (const organization of PLACEHOLDER_ORGANIZATIONS) {
    if (siteSource.includes(organization)) {
      warnings.push(`Experience entry still uses placeholder organization "${organization}"`);
    }
  }

  const resumePath = join(rootDir, "apps/web/public/resume.pdf");
  if (!existsSync(resumePath)) {
    errors.push("Resume file missing at /resume.pdf");
  }

  const heroPortraitPath = join(rootDir, "apps/web/public/images/hero-portrait.png");

  if (!existsSync(heroPortraitPath)) {
    warnings.push(
      "Hero photo missing at /images/hero-portrait.png — add a portrait image for the hero section",
    );
  }

  if (warnings.length > 0) {
    console.warn("validate-content warnings:\n");
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
    console.warn("");
  }

  if (errors.length > 0) {
    console.error("validate-content failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("validate-content passed.");
}

main();
