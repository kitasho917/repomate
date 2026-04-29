import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RepoMate",
  description: "理系大学生のためのAIレポート作成サポート",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
