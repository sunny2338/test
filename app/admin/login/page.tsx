import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAuthed()) redirect("/admin");
  return (
    <div className="login-wrap">
      <div className="card login">
        <h1>이야온 어드민</h1>
        <p className="muted" style={{ marginTop: 0, marginBottom: 20 }}>관리자 비밀번호를 입력하세요.</p>
        <LoginForm />
      </div>
    </div>
  );
}
