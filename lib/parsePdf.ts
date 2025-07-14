import pdf from "pdf-parse";

export async function parsePdf(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text.trim();
}