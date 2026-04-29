"use client";

import { useEffect, useState } from "react";
import { AiAssistPanel } from "@/components/AiAssistPanel";
import { reviseReportWithInstruction } from "@/lib/ai";
import { getReportById, upsertReport } from "@/lib/storage";
import { Report } from "@/lib/types";

export function ReportEditor({ id }: { id: string }) {
  const [report, setReport] = useState<Report | null>(null);
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const data = getReportById(id);
    if (data) setReport(data);
  }, [id]);

  if (!report) {
    return <p className="card">レポートが見つかりませんでした。</p>;
  }

  const onSave = () => {
    const next = { ...report, updatedAt: new Date().toISOString() };
    upsertReport(next);
    setReport(next);
    setMessage("保存しました");
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(report.generatedBody);
    setMessage("本文をコピーしました");
  };

  const onRequestRevision = async (instruction: string) => {
    const revised = await reviseReportWithInstruction(report.generatedBody, instruction);
    setSuggestion(revised);
    setMessage("AI修正案を作成しました");
    return revised;
  };

  const onApplySuggestion = () => {
    if (!suggestion) return;
    setReport({ ...report, generatedBody: suggestion });
    setMessage("修正案を本文に反映しました。必要に応じて保存してください。");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <section className="card">
        <label className="text-sm font-medium">レポートタイトル</label>
        <input
          className="input mt-1"
          value={report.title}
          onChange={(e) => setReport({ ...report, title: e.target.value })}
        />
        <label className="mt-3 block text-sm font-medium">本文エディタ</label>
        <textarea
          className="textarea mt-1 min-h-[420px]"
          value={report.generatedBody}
          onChange={(e) => setReport({ ...report, generatedBody: e.target.value })}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="btn-primary" onClick={onSave}>
            保存
          </button>
          <button className="btn-secondary" onClick={onCopy}>
            コピーする
          </button>
        </div>
        {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
      </section>
      <AiAssistPanel onRequest={onRequestRevision} onApply={onApplySuggestion} suggestion={suggestion} />
    </div>
  );
}
