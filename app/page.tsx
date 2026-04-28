import Link from "next/link";
import { Header } from "@/components/Header";

const features = [
  "AI風下書き生成",
  "AI修正パネル",
  "localStorage保存",
  "検索・コピー・削除",
];

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">RepoMate</h1>
        <p className="mt-2 text-slate-700">理系大学生のためのAIレポート作成サポート</p>
        <Link href="/dashboard" className="btn-primary mt-5 inline-block">
          ゲストで始める
        </Link>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="card font-medium">
              {feature}
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          注意: 本アプリのAI機能は疑似生成です。提出前に必ず内容を確認し、大学・授業のルールを守って利用してください。
        </p>
      </section>
    </main>
  );
}
