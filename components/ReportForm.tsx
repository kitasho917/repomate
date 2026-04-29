"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateDraft } from "@/lib/ai";
import { upsertReport } from "@/lib/storage";
import { ReportInput } from "@/lib/types";
import { toTags } from "@/lib/utils";

const initial: ReportInput = {
  title: "",
  subject: "",
  reportType: "実験レポート",
  experimentName: "",
  purpose: "",
  equipment: "",
  method: "",
  result: "",
  discussionNotes: "",
  assignments: "",
  referencesText: "",
  writingStyle: "普通の大学生風",
  tags: [],
};

export function ReportForm() {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [rawTags, setRawTags] = useState("");

  const update = (key: keyof ReportInput, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const onCreate = () => {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const report = {
      ...form,
      id,
      tags: toTags(rawTags),
      generatedBody: generateDraft({ ...form, tags: toTags(rawTags) }),
      createdAt: now,
      updatedAt: now,
    };
    upsertReport(report);
    router.push(`/reports/${id}`);
  };

  return (
    <div className="card grid gap-3">
      <input className="input" placeholder="レポートタイトル" value={form.title} onChange={(e) => update("title", e.target.value)} />
      <input className="input" placeholder="科目名" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
      <input className="input" placeholder="レポート種類" value={form.reportType} onChange={(e) => update("reportType", e.target.value)} />
      <input className="input" placeholder="実験名" value={form.experimentName} onChange={(e) => update("experimentName", e.target.value)} />
      <textarea className="textarea" placeholder="目的" value={form.purpose} onChange={(e) => update("purpose", e.target.value)} />
      <textarea className="textarea" placeholder="使用器具" value={form.equipment} onChange={(e) => update("equipment", e.target.value)} />
      <textarea className="textarea" placeholder="実験方法" value={form.method} onChange={(e) => update("method", e.target.value)} />
      <textarea className="textarea" placeholder="実験結果" value={form.result} onChange={(e) => update("result", e.target.value)} />
      <textarea className="textarea" placeholder="考察に入れたい内容" value={form.discussionNotes} onChange={(e) => update("discussionNotes", e.target.value)} />
      <textarea className="textarea" placeholder="課題" value={form.assignments} onChange={(e) => update("assignments", e.target.value)} />
      <textarea className="textarea" placeholder="参考文献" value={form.referencesText} onChange={(e) => update("referencesText", e.target.value)} />
      <input className="input" placeholder="タグ（カンマ区切り）" value={rawTags} onChange={(e) => setRawTags(e.target.value)} />
      <input className="input" placeholder="文体" value={form.writingStyle} onChange={(e) => update("writingStyle", e.target.value)} />
      <button className="btn-primary" onClick={onCreate}>
        AI風下書きを生成して作成
      </button>
    </div>
  );
}
