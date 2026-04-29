import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-blue-700">
          RepoMate
        </Link>
        <nav className="flex gap-2 text-sm">
          <Link href="/dashboard" className="btn-secondary">
            ダッシュボード
          </Link>
          <Link href="/reports/new" className="btn-primary">
            新規作成
          </Link>
        </nav>
      </div>
    </header>
  );
}
