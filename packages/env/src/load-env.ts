import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";

const envFileNames = [
  ".env",
  ".env.development",
  ".env.dev",
  ".env.local",
  ".env.development.local",
] as const;

function loadEnvFiles(baseDir: string) {
  for (const fileName of envFileNames) {
    const filePath = resolve(baseDir, fileName);
    if (!existsSync(filePath)) continue;

    config({
      path: filePath,
      override: fileName !== ".env",
      quiet: true,
    });
  }
}

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const monorepoRoot = resolve(packageRoot, "../..");
const webAppRoot = resolve(monorepoRoot, "apps/web");

loadEnvFiles(monorepoRoot);
loadEnvFiles(webAppRoot);
