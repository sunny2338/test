import { list } from "@/lib/store";
import { fmt } from "@/lib/format";
import { deleteInquiry, updateInquiry } from "@/lib/actions";
import ConfirmButton from "../ConfirmButton";
import StatusBadge from "../StatusBadge";

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ t?: string; s?: string }> }) {
  const { t, s } = await searchParams;
  const items = (await list("inquiries"))
    .filter((i) => (!t || i.type === t) && (!s || i.status === s))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const q = (k: string, v?: string) => {
    const p = new URLSearchParams();
    const next = { t, s, [k]: v };
    if (next.t) p.set("t", next.t);
    if (next.s) p.set("s", next.s);
    const str = p.toString();
    return `/admin/inquiries${str ? `?${str}` : ""}`;
  };

  return (
    <>
      <div className="page-head"><h1>문의/예약 내역</h1></div>
      <div className="filters">
        <a href={q("t")} className={!t ? "on" : ""}>전체</a>
        <a href={q("t", "문의")} className={t === "문의" ? "on" : ""}>문의</a>
        <a href={q("t", "예약")} className={t === "예약" ? "on" : ""}>예약</a>
        <span style={{ width: 12 }} />
        <a href={q("s")} className={!s ? "on" : ""}>모든 상태</a>
        {["접수", "처리중", "완료"].map((st) => (
          <a key={st} href={q("s", st)} className={s === st ? "on" : ""}>{st}</a>
        ))}
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr><th>구분</th><th>이름 / 연락처</th><th>내용</th><th>예약일시</th><th>접수일</th><th>상태 / 메모</th><th></th></tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={7} className="muted">내역이 없습니다.</td></tr>}
            {items.map((i) => (
              <tr key={i.id}>
                <td><span className="badge gray">{i.type}</span></td>
                <td><strong>{i.name}</strong><div className="muted">{i.contact}</div></td>
                <td style={{ maxWidth: 280, whiteSpace: "pre-wrap" }}>{i.message}</td>
                <td className="muted">{i.reservedAt ? fmt(i.reservedAt) : "-"}</td>
                <td className="muted">{fmt(i.createdAt)}</td>
                <td style={{ minWidth: 220 }}>
                  <form action={updateInquiry.bind(null, i.id)} style={{ display: "grid", gap: 6 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <StatusBadge s={i.status} />
                      <select name="status" defaultValue={i.status} style={{ width: "auto" }}>
                        <option>접수</option><option>처리중</option><option>완료</option>
                      </select>
                    </div>
                    <input type="text" name="memo" placeholder="관리자 메모" defaultValue={i.memo} />
                    <button className="btn ghost sm" style={{ justifySelf: "start" }}>저장</button>
                  </form>
                </td>
                <td><ConfirmButton action={deleteInquiry.bind(null, i.id)} message={`${i.name}님의 ${i.type}을 삭제할까요?`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
