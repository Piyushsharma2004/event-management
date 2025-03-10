/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignores ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignores TypeScript errors during build
  },
  reactStrictMode: false, // 🚀 Disables React Strict Mode
  poweredByHeader: false, // ⚡ Removes "X-Powered-By" header for optimization
  trailingSlash: true, // ✅ Ensures all URLs end with a slash for consistency
  generateBuildId: async () => "build", // 🔄 Prevents dynamic build IDs (optional)
  experimental: {
    appDir: true, // ✅ Ensures correct usage of Next.js App Router
    optimizeCss: true, // 🎨 Improves CSS performance
  },
  compiler: {
    styledComponents: true, // ✅ Improves compatibility with styled-components
    removeConsole: process.env.NODE_ENV === "production", // 🛑 Removes console logs in production
  },
  env: {
    NEXT_PUBLIC_IGNORE_ERRORS: "true", // ✅ Custom environment variable to ignore errors
  },
};

module.exports = nextConfig;
