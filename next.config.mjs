/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // The careers form uploads a résumé + photo via a Server Action. Next.js
      // defaults to a 1 MB limit, which rejects file uploads before our action
      // runs (so our try/catch can't catch it). Raise it. NOTE: hosting
      // platforms add their own request-body cap (Vercel serverless ≈ 4.5 MB),
      // so keep total uploads comfortably under that.
      bodySizeLimit: "5mb",
    },
  },
  // Security headers are also applied in middleware (with a per-request CSP nonce).
  // These act as a static baseline / defence-in-depth.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
