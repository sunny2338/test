import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이야온 어드민",
  description: "iyaon-site 관리자 페이지",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
