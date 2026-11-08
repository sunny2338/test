import type { NextConfig } from "next";

// 사이트(public/index.html)는 "/" 에서, 어드민은 "/admin" 에서 제공합니다.
// (선택) 어드민을 별도 프로젝트로 배포하고 다른 사이트에서 /admin 을 rewrite 할 때만:
// - ASSET_PREFIX: JS/CSS(/_next/...)를 어드민 도메인에서 불러옴
// - ALLOWED_ORIGINS: 폼 전송(Server Actions)을 허용할 사이트 도메인, 쉼표 구분
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "iyaon-site.vercel.app")
  .split(",")
  .map((s) => s.trim().replace(/^https?:\/\//, ""))
  .filter(Boolean);

const nextConfig: NextConfig = {
  assetPrefix: process.env.ASSET_PREFIX || undefined,
  experimental: {
    serverActions: { allowedOrigins },
  },
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/index.html" }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;
