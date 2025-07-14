import { NextRequest, NextResponse } from "next/server";
import { PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const body = await req.json();

  const { id, live } = body; 

  if (!id || typeof id !== "string" || typeof live !== "string") {
    return new NextResponse("Missing or invalid 'id' or 'live'", { status: 400 });
  }

  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE!, 
    Item: {
      userId: userId, 
      resumeData: body,
      id,                   
      live, 
      timestamp: Date.now(),
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    return NextResponse.json({ message: "Saved successfully" });
  } catch (err) {
    console.error("DynamoDB error:", err);
    return new NextResponse("Error saving", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE!,
    Key: { userId },
  };

  try {
    const data = await docClient.send(new GetCommand(params));
    if (!data.Item) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.json(data.Item);
  } catch (err) {
    console.error("DynamoDB error:", err);
    return new NextResponse("Error fetching", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);

  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE!,
    Key: { userId },
  };

  try {
    await docClient.send(new DeleteCommand(params));
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DynamoDB error:", err);
    return new NextResponse("Error deleting", { status: 500 });
  }
}