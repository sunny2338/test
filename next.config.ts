import type { NextConfig } from "next";

// iyaon-site에서 /admin 을 이 앱으로 rewrite(프록시)해서 사용합니다.
// - ASSET_PREFIX: JS/CSS(/_next/...)를 이 앱 도메인에서 불러옴. 예) https://iyaon-admin.vercel.app
// - ALLOWED_ORIGINS: 폼 전송(Server Actions)을 허용할 사이트 도메인. 쉼표로 구분.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "iyaon-site.vercel.app")
  .split(",")
  .map((s) => s.trim().replace(/^https?:\/\//, ""))
  .filter(Boolean);

const nextConfig: NextConfig = {
  assetPrefix: process.env.ASSET_PREFIX || undefined,
  experimental: {
    serverActions: { allowedOrigins },
  },
};

export default nextConfig;
