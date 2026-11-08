import { createPost } from "@/lib/actions";
import PostForm from "../PostForm";

export default function NewPost() {
  return (
    <>
      <div className="page-head"><h1>새 글 작성</h1></div>
      <PostForm action={createPost} />
    </>
  );
}
