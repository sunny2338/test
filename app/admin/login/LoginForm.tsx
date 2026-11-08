"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action}>
      {error && <div className="error">{error}</div>}
      <div className="field">
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="password" autoFocus required />
      </div>
      <button className="btn" disabled={pending}>{pending ? "확인 중…" : "로그인"}</button>
    </form>
  );
}
