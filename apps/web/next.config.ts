import "@heyshahrukh007.github.io/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  typedRoutes: true,
  reactCompiler: true,
  images: { unoptimized: true },
};

export default nextConfig;
