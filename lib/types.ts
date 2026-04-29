export type Report = {
  id: string;
  title: string;
  subject: string;
  reportType: string;
  experimentName?: string;
  purpose: string;
  equipment: string;
  method: string;
  result: string;
  discussionNotes: string;
  assignments: string;
  referencesText: string;
  writingStyle: string;
  generatedBody: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type ReportInput = Omit<Report, "id" | "createdAt" | "updatedAt" | "generatedBody">;
