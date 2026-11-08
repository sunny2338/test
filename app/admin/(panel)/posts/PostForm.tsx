import Link from "next/link";
import type { Post } from "@/lib/types";

export default function PostForm({ post, action }: { post?: Post; action: (f: FormData) => Promise<void> }) {
  return (
    <form action={action} className="card">
      <div className="field">
        <label htmlFor="category">분류</label>
        <select id="category" name="category" defaultValue={post?.category ?? "게시글"}>
          <option value="게시글">게시글</option>
          <option value="공지">공지</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="title">제목</label>
        <input id="title" name="title" type="text" required defaultValue={post?.title} />
      </div>
      <div className="field">
        <label htmlFor="content">내용</label>
        <textarea id="content" name="content" defaultValue={post?.content} />
      </div>
      <div className="field" style={{ flexDirection: "row" }}>
        <label className="check"><input type="checkbox" name="published" defaultChecked={post?.published ?? true} /> 공개</label>
        <label className="check"><input type="checkbox" name="pinned" defaultChecked={post?.pinned} /> 상단 고정</label>
      </div>
      <div className="actions">
        <button className="btn">{post ? "수정 저장" : "등록"}</button>
        <Link className="btn ghost" href="/admin/posts">취소</Link>
      </div>
    </form>
  );
}
