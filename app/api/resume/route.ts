import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { parsePdf } from "@/lib/parsePdf";
import { s3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
  "use server";

  const { userId } = getAuth(req);
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return new NextResponse("No file uploaded", { status: 400 });

  const fileKey = `resumes/${userId}.pdf`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
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

  const fileKey = `resumes/${userId}.pdf`;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
    });

    const { Body } = await s3.send(command);
    const stream = Body as Readable;
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array);
    }

    const pdfBuffer = Buffer.concat(chunks);
    const data = await parsePdf(pdfBuffer);

    if (!data || (typeof data === "string" && data.trim() === "")) {
      return NextResponse.json(
        { error: "Could not parse resume PDF" },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { text: data },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching resume:", err);
    return NextResponse.json(
      { error: "Resume not found" },
      { status: 404 }
    );
  }
}
