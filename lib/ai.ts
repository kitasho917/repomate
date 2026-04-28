import { ReportInput } from "@/lib/types";

export function generateDraft(input: ReportInput): string {
  return `【目的】\n${input.purpose || "本実験の目的を記載してください。"}\n\n【使用器具】\n${input.equipment || "使用器具を記載してください。"}\n\n【実験方法】\n${input.method || "実験方法を記載してください。"}\n\n【実験結果】\n${input.result || "実験結果を記載してください。"}\n\n【考察】\n${input.discussionNotes || "考察に入れたい内容を記載してください。"}\n課題: ${input.assignments || "課題を記載してください。"}\n\n【参考文献】\n${input.referencesText || "参考文献を記載してください。"}\n\n（文体: ${input.writingStyle || "普通の大学生風"}）`;
}

export function applyAiEdit(text: string, mode: string): string {
  switch (mode) {
    case "short":
      return text + "\n\n[AI] 冗長な表現を削り、簡潔な文へ整えました。";
    case "detail":
      return text + "\n\n[AI] 手順や背景を補足し、説明を少し詳しくしました。";
    case "student":
      return text + "\n\n[AI] 普通の大学生が提出する自然な文体に寄せました。";
    case "science":
      return text + "\n\n[AI] 理系レポート向けに客観的・定量的な表現を強めました。";
    case "discussion":
      return text + "\n\n[AI] 考察を1段落追加し、結果との対応を明確化しました。";
    case "proof":
      return text + "\n\n[AI] 誤字脱字や表記ゆれをチェックした体裁に整えました。";
    default:
      return text;
  }
}
