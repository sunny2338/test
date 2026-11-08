"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "./auth";
import * as db from "./store";
import type { InquiryStatus, MemberRole } from "./types";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const bool = (f: FormData, k: string) => f.get(k) === "on";

// ── 인증 ─────────────────────────────────────────
export async function login(_: string | null, f: FormData) {
  if (!process.env.ADMIN_PASSWORD) return "서버에 ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.";
  if (!checkPassword(str(f, "password"))) return "비밀번호가 올바르지 않습니다.";
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ── 게시글/공지 ───────────────────────────────────
function postFields(f: FormData) {
  const title = str(f, "title");
  if (!title) throw new Error("제목을 입력하세요.");
  return {
    title,
    content: str(f, "content"),
    category: (str(f, "category") === "공지" ? "공지" : "게시글") as "공지" | "게시글",
    pinned: bool(f, "pinned"),
    published: bool(f, "published"),
  };
}

export async function createPost(f: FormData) {
  await requireAdmin();
  const now = new Date().toISOString();
  await db.insert("posts", { ...postFields(f), createdAt: now, updatedAt: now });
  revalidatePath("/admin", "layout");
  redirect("/admin/posts");
}

export async function updatePost(id: string, f: FormData) {
  await requireAdmin();
  await db.update("posts", id, { ...postFields(f), updatedAt: new Date().toISOString() });
  revalidatePath("/admin", "layout");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await db.remove("posts", id);
  revalidatePath("/admin", "layout");
}

export async function togglePublish(id: string, published: boolean) {
  await requireAdmin();
  await db.update("posts", id, { published, updatedAt: new Date().toISOString() });
  revalidatePath("/admin", "layout");
}

// ── 문의/예약 ─────────────────────────────────────
const STATUSES: InquiryStatus[] = ["접수", "처리중", "완료"];

export async function updateInquiry(id: string, f: FormData) {
  await requireAdmin();
  const status = str(f, "status") as InquiryStatus;
  await db.update("inquiries", id, {
    status: STATUSES.includes(status) ? status : "접수",
    memo: str(f, "memo"),
  });
  revalidatePath("/admin", "layout");
}

export async function deleteInquiry(id: string) {
  await requireAdmin();
  await db.remove("inquiries", id);
  revalidatePath("/admin", "layout");
}

// ── 회원 ──────────────────────────────────────────
export async function createMember(f: FormData) {
  await requireAdmin();
  const name = str(f, "name");
  const email = str(f, "email");
  if (!name || !email) throw new Error("이름과 이메일을 입력하세요.");
  await db.insert("members", {
    name,
    email,
    phone: str(f, "phone"),
    role: (str(f, "role") === "관리자" ? "관리자" : "회원") as MemberRole,
    active: true,
    createdAt: new Date().toISOString(),
  });
  revalidatePath("/admin", "layout");
}

export async function updateMember(id: string, patch: { role?: MemberRole; active?: boolean }) {
  await requireAdmin();
  const clean: { role?: MemberRole; active?: boolean } = {};
  if (patch.role === "관리자" || patch.role === "회원") clean.role = patch.role;
  if (typeof patch.active === "boolean") clean.active = patch.active;
  await db.update("members", id, clean);
  revalidatePath("/admin", "layout");
}

export async function deleteMember(id: string) {
  await requireAdmin();
  await db.remove("members", id);
  revalidatePath("/admin", "layout");
}
