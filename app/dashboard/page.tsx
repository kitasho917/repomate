"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { EmptyState } from "@/components/EmptyState";
import { ReportCard } from "@/components/ReportCard";
import { deleteReport, getReports } from "@/lib/storage";

export default function DashboardPage() {
  const [keyword, setKeyword] = useState("");
  const [tick, setTick] = useState(0);
  const reports = getReports();

  const filtered = useMemo(() => {
    if (!keyword) return reports;
    const k = keyword.toLowerCase();
    return reports.filter((r) => [r.title, r.subject, r.reportType, r.tags.join(" ")].join(" ").toLowerCase().includes(k));
  }, [reports, keyword, tick]);

  const onDelete = (id: string) => {
    deleteReport(id);
    setTick((v) => v + 1);
  };

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <Link href="/reports/new" className="btn-primary">
            新規作成
          </Link>
        </div>
        <input
          className="input mb-4"
          placeholder="タイトル・科目・タグで検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="grid gap-3">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((report) => <ReportCard key={report.id} report={report} onDelete={onDelete} />)
          )}
        </div>
      </section>
    </main>
  );
}
