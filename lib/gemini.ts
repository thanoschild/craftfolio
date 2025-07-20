import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateJson(text: string) {
  const prompt = `
Given the following resume text, extract the information into the JSON format provided below. Return all values in **paragraph form** (no bullet points). 

If the "about" section is missing, generate a 2–3 line first-person "About Me" section suitable for a portfolio website. Ensure all fields are included, even if some values are blank. Use contextual understanding to fill in details where possible (e.g., current role, open to work).

Format:

{
    "name": "",
    "address": "",
    "email": "",
    "moblie_no": "",
    "current_role": "",
    "open_to_work": "",
    "linkedin_url": "",
    "github_url": "",
    "twitter_url": "",
    "about": "",
    "experience": [
        {
            "company_name": "",
            "role": "",
            "period": "",
            "place": "",
            "company_website_url": "",
            "description": ""
        }
    ],
    "projects": [
        {
            "project_name": "",
            "project_url": "",
            "description": ""
        }
    ],
    "education": [
        {
            "institution_name": "",
            "period": "",
            "description": ""
        }
    ],
    "skills": ["", ""]
}

Resume Text:
"""
${text}
"""

Return only the final JSON object as output.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text || "nothing";
}
