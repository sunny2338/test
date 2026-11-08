export default function StatusBadge({ s }: { s: string }) {
  const cls = s === "완료" ? "badge" : s === "처리중" ? "badge warn" : "badge danger";
  return <span className={cls}>{s}</span>;
}
