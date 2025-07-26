import { NextRequest, NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini";
import { getAuth } from "@clerk/nextjs/server";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  "use server";

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { error: "Sign in to create portfolio" },
      { status: 401 }
    );
  }

  // Rate limit: 5 portfolio generations per hour (expensive AI operation)
  if (!rateLimit(`portfolio-generate:${userId}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Portfolio generation limit exceeded. You can generate 5 portfolios per hour." },
      { status: 429 }
    );
  }

  const { text } = await req.json();
  const result = await generateJson(text);
  return NextResponse.json({ result });
}
