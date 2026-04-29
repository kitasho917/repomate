"use client";

import { Report } from "@/lib/types";

export const STORAGE_KEY = "repomate_reports";

export function getReports(): Report[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as Report[];
  } catch {
    return [];
  }
}

export function saveReports(reports: Report[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function upsertReport(report: Report): void {
  const reports = getReports();
  const idx = reports.findIndex((r) => r.id === report.id);
  if (idx >= 0) {
    reports[idx] = report;
  } else {
    reports.unshift(report);
  }
  saveReports(reports);
}

export function deleteReport(id: string): void {
  const reports = getReports().filter((r) => r.id !== id);
  saveReports(reports);
}

export function getReportById(id: string): Report | undefined {
  return getReports().find((r) => r.id === id);
}
