/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false, 
  poweredByHeader: false, 
  trailingSlash: true, 
  generateBuildId: async () => "build",
  experimental: {
    optimizeCss: true,  // ✅ Keep valid experimental features
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  env: {
    NEXT_PUBLIC_IGNORE_ERRORS: "true",
  },
};

module.exports = nextConfig;
