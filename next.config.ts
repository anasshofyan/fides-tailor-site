import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },
  outputFileTracingRoot: path.resolve("."),
};

export default nextConfig;
