import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return new NextResponse("Missing id", { status: 400 });
  }

  const tableName = process.env.AWS_DYNAMODB_TABLE!;

  const paramsTrue = {
    TableName: tableName,
    IndexName: "id-live-index",
    KeyConditionExpression: "#id = :idVal AND #live = :liveTrue",
    ExpressionAttributeNames: {
      "#id": "id",
      "#live": "live",
    },
    ExpressionAttributeValues: {
      ":idVal": id,
      ":liveTrue": "true",
    },
    Limit: 1,
  };

  const paramsFalse = {
    TableName: tableName,
    IndexName: "id-live-index",
    KeyConditionExpression: "#id = :idVal AND #live = :liveFalse",
    ExpressionAttributeNames: {
      "#id": "id",
      "#live": "live",
    },
    ExpressionAttributeValues: {
      ":idVal": id,
      ":liveFalse": "false",
    },
    Limit: 1,
  };

  try {
    const [resultTrue, resultFalse] = await Promise.all([
      docClient.send(new QueryCommand(paramsTrue)),
      docClient.send(new QueryCommand(paramsFalse)),
    ]);

    const exists =
      (resultTrue.Items && resultTrue.Items.length > 0) ||
      (resultFalse.Items && resultFalse.Items.length > 0);

    return NextResponse.json({ available: !exists });
  } catch (err) {
    console.error("DynamoDB Query Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
