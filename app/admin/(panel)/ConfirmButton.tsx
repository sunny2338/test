"use client";

export default function ConfirmButton({
  action,
  message,
  label = "삭제",
}: {
  action: () => Promise<void>;
  message: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      <button className="btn danger sm">{label}</button>
    </form>
  );
}
