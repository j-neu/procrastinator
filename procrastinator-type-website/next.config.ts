import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        // Vercel serves everything in public/ with `max-age=0, must-revalidate`
        // (only /_next/static gets long caching), so the self-hosted icon font
        // was revalidated on every visit. The filename carries a version, so it
        // is safe to treat as immutable. Bump the version when regenerating it.
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          // Only HSTS was being sent (by Vercel). These are the standard
          // hardening headers a security audit expects to see.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
