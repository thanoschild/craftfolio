import { NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";

export async function GET() {
  try {
    const params = {
      TableName: process.env.AWS_DYNAMODB_TABLE!,
      IndexName: "live-timestamp-index",
      KeyConditionExpression: "live = :liveVal",
      ExpressionAttributeValues: {
        ":liveVal": "true"
      },
      Select: "COUNT" as const
    };

    const data = await docClient.send(new QueryCommand(params));
    const totalCount = data.Count || 0;

    return NextResponse.json({ 
      totalItems: totalCount,
      success: true 
    });

  } catch (err) {
    console.error("DynamoDB count error:", err);
    return NextResponse.json({ 
      error: "Error fetching portfolio count",
      totalItems: 0,
      success: false 
    }, { status: 500 });
  }
}