import Link from "next/link";
import { list } from "@/lib/store";
import { fmt } from "@/lib/format";
import StatusBadge from "./StatusBadge";

export default async function Dashboard() {
  const [posts, inquiries, members] = await Promise.all([list("posts"), list("inquiries"), list("members")]);
  const stats = [
    { label: "전체 게시글", value: posts.length },
    { label: "공개 중", value: posts.filter((p) => p.published).length },
    { label: "미처리 문의/예약", value: inquiries.filter((i) => i.status !== "완료").length },
    { label: "활성 회원", value: members.filter((m) => m.active).length },
  ];
  const recentInq = [...inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const recentPosts = [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  return (
    <>
      <div className="page-head">
        <h1>대시보드</h1>
        <Link className="btn" href="/admin/posts/new">+ 새 글 작성</Link>
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="grid2">
        <section className="card">
          <h2>최근 문의/예약</h2>
          {recentInq.length === 0 && <p className="muted">아직 없습니다.</p>}
          <table>
            <tbody>
              {recentInq.map((i) => (
                <tr key={i.id}>
                  <td><span className="badge gray">{i.type}</span></td>
                  <td>{i.name}</td>
                  <td><StatusBadge s={i.status} /></td>
                  <td className="muted">{fmt(i.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><Link href="/admin/inquiries">전체 보기 →</Link></p>
        </section>
        <section className="card">
          <h2>최근 게시글</h2>
          {recentPosts.length === 0 && <p className="muted">아직 없습니다.</p>}
          <table>
            <tbody>
              {recentPosts.map((p) => (
                <tr key={p.id}>
                  <td><span className="badge">{p.category}</span></td>
                  <td><Link href={`/admin/posts/${p.id}`}>{p.title}</Link></td>
                  <td>{p.published ? <span className="badge">공개</span> : <span className="badge gray">비공개</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><Link href="/admin/posts">전체 보기 →</Link></p>
        </section>
      </div>
    </>
  );
}
