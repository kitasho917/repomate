import { Header } from "@/components/Header";
import { ReportEditor } from "@/components/ReportEditor";

export default async function ReportEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">レポート編集</h1>
        <ReportEditor id={id} />
      </section>
    </main>
  );
}
