import Link from "next/link";
import { list } from "@/lib/store";
import { fmt } from "@/lib/format";
import { deletePost, togglePublish } from "@/lib/actions";
import ConfirmButton from "../ConfirmButton";

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const all = await list("posts");
  const posts = all
    .filter((p) => !c || p.category === c)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <div className="page-head">
        <h1>게시글/공지</h1>
        <Link className="btn" href="/admin/posts/new">+ 새 글 작성</Link>
      </div>
      <div className="filters">
        <a href="/admin/posts" className={!c ? "on" : ""}>전체</a>
        <a href="/admin/posts?c=공지" className={c === "공지" ? "on" : ""}>공지</a>
        <a href="/admin/posts?c=게시글" className={c === "게시글" ? "on" : ""}>게시글</a>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr><th>분류</th><th>제목</th><th>상태</th><th>작성일</th><th>관리</th></tr>
          </thead>
          <tbody>
            {posts.length === 0 && <tr><td colSpan={5} className="muted">게시글이 없습니다.</td></tr>}
            {posts.map((p) => (
              <tr key={p.id}>
                <td><span className="badge">{p.category}</span></td>
                <td>
                  {p.pinned && <span className="badge warn" style={{ marginRight: 6 }}>고정</span>}
                  <Link href={`/admin/posts/${p.id}`}>{p.title}</Link>
                </td>
                <td>{p.published ? <span className="badge">공개</span> : <span className="badge gray">비공개</span>}</td>
                <td className="muted">{fmt(p.createdAt)}</td>
                <td>
                  <div className="actions">
                    <Link className="btn ghost sm" href={`/admin/posts/${p.id}`}>수정</Link>
                    <form action={togglePublish.bind(null, p.id, !p.published)}>
                      <button className="btn ghost sm">{p.published ? "비공개로" : "공개로"}</button>
                    </form>
                    <ConfirmButton action={deletePost.bind(null, p.id)} message={`"${p.title}" 글을 삭제할까요?`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
