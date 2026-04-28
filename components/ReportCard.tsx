"use client";

import Link from "next/link";
import { Report } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ReportCard({ report, onDelete }: { report: Report; onDelete: (id: string) => void }) {
  return (
    <article className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{report.title}</h3>
          <p className="text-sm text-slate-600">
            {report.subject} / {report.reportType}
          </p>
          <p className="mt-1 text-xs text-slate-500">更新: {formatDate(report.updatedAt)}</p>
        </div>
        <button className="btn-secondary" onClick={() => onDelete(report.id)}>
          削除
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {report.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
            #{tag}
          </span>
        ))}
      </div>
      <Link href={`/reports/${report.id}`} className="mt-3 inline-block text-sm font-medium text-blue-700">
        編集画面へ →
      </Link>
    </article>
  );
}
