import { requireAdmin } from "@/lib/auth";
import { logout } from "@/lib/actions";
import { list, storageMode } from "@/lib/store";
import Nav from "./Nav";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const [posts, inquiries, members] = await Promise.all([list("posts"), list("inquiries"), list("members")]);
  const openInquiries = inquiries.filter((i) => i.status !== "완료").length;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          IYAON
          <small>관리자 페이지</small>
        </div>
        <Nav counts={{ posts: posts.length, inquiries: openInquiries, members: members.length }} />
        <form action={logout} className="bottom">
          <button className="btn">로그아웃</button>
        </form>
      </aside>
      <main className="main">
        {storageMode === "memory" && (
          <div className="notice">
            현재 임시(메모리) 저장소를 사용 중입니다. 재배포 시 데이터가 초기화되니, Vercel에서 KV(Upstash Redis)를 연결해 주세요.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
