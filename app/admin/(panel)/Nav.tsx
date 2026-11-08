"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ counts }: { counts: { posts: number; inquiries: number; members: number } }) {
  const path = usePathname();
  const items = [
    { href: "/admin", label: "대시보드" },
    { href: "/admin/posts", label: "게시글/공지", count: counts.posts },
    { href: "/admin/inquiries", label: "문의/예약", count: counts.inquiries },
    { href: "/admin/members", label: "회원 관리", count: counts.members },
  ];
  return (
    <nav className="nav">
      {items.map((it) => {
        const active = it.href === "/admin" ? path === "/admin" : path.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} className={active ? "active" : ""}>
            {it.label}
            {it.count !== undefined && <span className="count">{it.count}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
