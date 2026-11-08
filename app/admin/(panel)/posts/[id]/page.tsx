import { notFound } from "next/navigation";
import { get } from "@/lib/store";
import { updatePost } from "@/lib/actions";
import { fmt } from "@/lib/format";
import PostForm from "../PostForm";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await get("posts", id);
  if (!post) notFound();
  return (
    <>
      <div className="page-head">
        <h1>글 수정</h1>
        <span className="muted">최종 수정 {fmt(post.updatedAt)}</span>
      </div>
      <PostForm post={post} action={updatePost.bind(null, post.id)} />
    </>
  );
}
