import { Header } from "@/components/Header";
import { ReportForm } from "@/components/ReportForm";

export default function NewReportPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">レポート新規作成</h1>
        <ReportForm />
      </section>
    </main>
  );
}
