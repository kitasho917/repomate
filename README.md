# RepoMate MVP

大学生向けレポート作成支援アプリ「RepoMate」のMVPです。

## 技術スタック
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- localStorage
- 疑似AI生成（実API未使用）

## 機能
- トップ画面
- ダッシュボード（一覧、検索、削除）
- レポート新規作成
- レポート編集
- AI風下書き生成
- AI修正パネル
- localStorage 保存
- コピー機能
- スマホ対応（レスポンシブ）

## 起動
```bash
npm install
npm run dev
```

## ビルド
```bash
npm run build
```

## localStorage
- キー: `repomate_reports`
