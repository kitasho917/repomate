import { ReportInput } from "@/lib/types";

export function generateDraft(input: ReportInput): string {
  return `【目的】\n${
    input.purpose || "本実験の目的を記載してください。"
  }\n\n【使用器具】\n${
    input.equipment || "使用器具を記載してください。"
  }\n\n【実験方法】\n${
    input.method || "実験方法を記載してください。"
  }\n\n【実験結果】\n${
    input.result || "実験結果を記載してください。"
  }\n\n【考察】\n${
    input.discussionNotes || "考察に入れたい内容を記載してください。"
  }\n課題: ${
    input.assignments || "課題を記載してください。"
  }\n\n【参考文献】\n${
    input.referencesText || "参考文献を記載してください。"
  }\n\n（文体: ${input.writingStyle || "普通の大学生風"}）`;
}

/**
 * 将来のAI API連携ポイント。
 * 現状はモックとして instruction を解釈し、修正済みテキストを返す。
 */
export async function reviseReportWithInstruction(
  reportBody: string,
  instruction: string
): Promise<string> {
  const normalized = instruction.trim().toLowerCase();
  const tagged = reportBody;

  if (!instruction.trim()) {
    return `${tagged}\n\n[AI提案] 指示が空だったため、修正方針を入力してください。`;
  }

  if (
    normalized.includes("短") ||
    normalized.includes("要約") ||
    normalized.includes("short")
  ) {
    return `${tagged}\n\n[AI提案] 全体を簡潔化し、重複表現を整理した版です。`;
  }

  if (
    normalized.includes("詳") ||
    normalized.includes("具体") ||
    normalized.includes("detail") ||
    normalized.includes("考察")
  ) {
    return `${tagged}\n\n[AI提案] 考察に「結果の理由・誤差要因・改善案」を追記した版です。`;
  }

  if (
    normalized.includes("大学生") ||
    normalized.includes("自然") ||
    normalized.includes("student")
  ) {
    return `${tagged}\n\n[AI提案] 普通の大学生が提出する自然な文章トーンに調整した版です。`;
  }

  if (
    normalized.includes("理系") ||
    normalized.includes("学術") ||
    normalized.includes("science")
  ) {
    return `${tagged}\n\n[AI提案] 理系レポート向けに客観表現・手順の明確性を強めた版です。`;
  }

  if (
    normalized.includes("誤字") ||
    normalized.includes("校正") ||
    normalized.includes("proof")
  ) {
    return `${tagged}\n\n[AI提案] 誤字脱字・表記ゆれを整えた版です。`;
  }

  return `${tagged}\n\n[AI提案] 指示「${instruction}」を反映した改善ドラフトです。`;
}