"use client";

const actions = [
  { key: "short", label: "もっと短くする" },
  { key: "detail", label: "もう少し詳しくする" },
  { key: "student", label: "普通の大学生風にする" },
  { key: "science", label: "理系レポート風にする" },
  { key: "discussion", label: "考察を少し増やす" },
  { key: "proof", label: "誤字脱字チェック風に整える" },
];

export function AiAssistPanel({ onSelect }: { onSelect: (mode: string) => void }) {
  return (
    <section className="card">
      <h2 className="text-base font-semibold">AI修正パネル</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <button key={action.key} className="btn-secondary text-sm" onClick={() => onSelect(action.key)}>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
