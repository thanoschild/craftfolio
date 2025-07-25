import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { parsePdf } from "@/lib/parsePdf";
import { s3 } from "@/lib/s3";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  "use server";

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" }, 
      { status: 401 }
    );
  }

  if (!rateLimit(`resume-upload:${userId}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Upload limit exceeded. You can upload 5 files per hour." },
      { status: 429 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const fileName = formData.get("fileName") as string;
  if (!file) return new NextResponse("No file uploaded", { status: 400 });

  const fileKey = `resumes/${userId}.pdf`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    Metadata: {
      originalfilename: fileName,
    },
  });

  await s3.send(command);

  return new NextResponse(JSON.stringify({ fileKey }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req: NextRequest) {
  "use server";

  const { userId } = getAuth(req);
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // Rate limit: 20 requests per minute per user for GET requests
  if (!rateLimit(`resume-get:${userId}`, 20, 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const fileKey = `resumes/${userId}.pdf`;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
    });

    const response = await s3.send(command);
    const stream = response.Body as Readable;
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array);
    }

    const pdfBuffer = Buffer.concat(chunks);
    const data = await parsePdf(pdfBuffer);

    const originalFileName = response.Metadata?.originalfilename || "resume.pdf";

    if (!data || (typeof data === "string" && data.trim() === "")) {
      return NextResponse.json(
        { error: "Could not parse resume PDF" },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { text: data, fileName: originalFileName },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching resume:", err);
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }
}
