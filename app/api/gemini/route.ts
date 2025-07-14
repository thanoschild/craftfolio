import { NextRequest, NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  "use server";

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { error: "Sign in to create portfolio" },
      { status: 401 }
    );
  }
  const { text } = await req.json();
  const result = await generateJson(text);
  return NextResponse.json({ result });
}
