import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateJson(text: string) {
  const prompt = `
Given the following resume text, extract the information into this JSON format give all answer in paragraph don't give in bullet point:

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
            "description": "",
        }
    ],
    "skills": ["", ""]
}

Resume Text:
"""
${text}
"""

Return only the JSON output based on the above schema.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text || "nothing";
}
