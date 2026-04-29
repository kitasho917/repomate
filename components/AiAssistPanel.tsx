"use client";

import { useState } from "react";

type ChatItem = {
  role: "user" | "assistant";
  text: string;
};

const presets = [
  { key: "考察を詳しくして", label: "考察を詳しく" },
  { key: "普通の大学生っぽくして", label: "大学生っぽく" },
  { key: "短くして", label: "短く" },
  { key: "理系レポート風にして", label: "理系レポート風" },
  { key: "誤字脱字を整えて", label: "校正" },
];

export function AiAssistPanel({
  onRequest,
  onApply,
  suggestion,
}: {
  onRequest: (instruction: string) => Promise<string>;
  onApply: () => void;
  suggestion: string;
}) {
  const [instruction, setInstruction] = useState("");
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const sendInstruction = async (value: string) => {
    const text = value.trim();
    if (!text) return;

    setLoading(true);
    setChat((prev) => [...prev, { role: "user", text }]);

    const revised = await onRequest(text);

    setChat((prev) => [...prev, { role: "assistant", text: "修正案を作成しました。下のプレビューを確認してください。" }]);
    setInstruction("");
    setLoading(false);

    return revised;
  };

  return (
    <section className="card">
      <h2 className="text-base font-semibold">AI修正チャット</h2>
      <p className="mt-1 text-xs text-slate-600">本文への指示を自由入力できます（例: 考察を詳しくして、短くして）。</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button key={preset.key} className="btn-secondary text-xs" onClick={() => void sendInstruction(preset.key)}>
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-3 max-h-48 space-y-2 overflow-auto rounded-lg border border-slate-200 p-2">
        {chat.length === 0 ? (
          <p className="text-xs text-slate-500">AIに修正指示を送ると、ここにやり取りが表示されます。</p>
        ) : (
          chat.map((item, i) => (
            <div
              key={`${item.role}-${i}`}
              className={`rounded-lg px-2 py-1 text-sm ${item.role === "user" ? "bg-blue-50 text-blue-900" : "bg-slate-100 text-slate-800"}`}
            >
              <span className="mr-1 text-xs font-semibold">{item.role === "user" ? "あなた" : "AI"}</span>
              {item.text}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="input"
          placeholder="例: 普通の大学生っぽくして"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void sendInstruction(instruction);
            }
          }}
        />
        <button className="btn-primary shrink-0" onClick={() => void sendInstruction(instruction)} disabled={loading}>
          {loading ? "生成中..." : "送信"}
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-2">
        <p className="text-xs font-semibold text-emerald-800">修正案プレビュー</p>
        <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap text-xs text-emerald-900">{suggestion || "まだ修正案はありません。"}</pre>
        <button className="btn-primary mt-2 text-sm" onClick={onApply} disabled={!suggestion}>
          本文に反映
        </button>
      </div>
    </section>
  );
}
