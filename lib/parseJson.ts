export function parseJson(raw: string) {
  // Remove ```json, ``` and trim whitespace
  const cleaned = raw.replace(/```json|```/g, "").trim();
  try {
    console.log("prased successfully")
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse JSON:", e, cleaned);
    return null;
  }
}