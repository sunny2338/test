import { list } from "@/lib/store";
import { fmt } from "@/lib/format";
import { createMember, deleteMember, updateMember } from "@/lib/actions";
import ConfirmButton from "../ConfirmButton";

export default async function MembersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const kw = (q ?? "").trim().toLowerCase();
  const members = (await list("members"))
    .filter((m) => !kw || [m.name, m.email, m.phone].some((v) => v.toLowerCase().includes(kw)))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <div className="page-head">
        <h1>회원 관리</h1>
        <form className="inline-form" action="/admin/members">
          <input type="text" name="q" placeholder="이름·이메일·전화 검색" defaultValue={q} style={{ width: 220 }} />
          <button className="btn ghost">검색</button>
        </form>
      </div>

      <form action={createMember} className="card inline-form" style={{ marginBottom: 16 }}>
        <div className="field"><label htmlFor="name">이름</label><input id="name" name="name" type="text" required /></div>
        <div className="field"><label htmlFor="email">이메일</label><input id="email" name="email" type="email" required /></div>
        <div className="field"><label htmlFor="phone">전화번호</label><input id="phone" name="phone" type="tel" /></div>
        <div className="field" style={{ flex: "0 1 120px" }}>
          <label htmlFor="role">권한</label>
          <select id="role" name="role" defaultValue="회원"><option>회원</option><option>관리자</option></select>
        </div>
        <button className="btn">+ 회원 추가</button>
      </form>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr><th>이름</th><th>이메일</th><th>전화번호</th><th>권한</th><th>상태</th><th>가입일</th><th>관리</th></tr>
          </thead>
          <tbody>
            {members.length === 0 && <tr><td colSpan={7} className="muted">회원이 없습니다.</td></tr>}
            {members.map((m) => (
              <tr key={m.id}>
                <td><strong>{m.name}</strong></td>
                <td>{m.email}</td>
                <td className="muted">{m.phone || "-"}</td>
                <td>{m.role === "관리자" ? <span className="badge warn">관리자</span> : <span className="badge">회원</span>}</td>
                <td>{m.active ? <span className="badge">활성</span> : <span className="badge gray">정지</span>}</td>
                <td className="muted">{fmt(m.createdAt)}</td>
                <td>
                  <div className="actions">
                    <form action={updateMember.bind(null, m.id, { role: m.role === "관리자" ? "회원" : "관리자" })}>
                      <button className="btn ghost sm">{m.role === "관리자" ? "회원으로" : "관리자로"}</button>
                    </form>
                    <form action={updateMember.bind(null, m.id, { active: !m.active })}>
                      <button className="btn ghost sm">{m.active ? "정지" : "활성화"}</button>
                    </form>
                    <ConfirmButton action={deleteMember.bind(null, m.id)} message={`${m.name} 회원을 삭제할까요?`} />
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
