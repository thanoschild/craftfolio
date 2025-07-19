import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo"; 

// const PAGE_LIMIT = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  
  // TODO: Change to PAGE_LIMIT later
  // const limit = parseInt(searchParams.get("limit") || `${PAGE_LIMIT}`, 100);
  const limit = 1000;  

  let lastEvaluatedKey: Record<string, unknown> | undefined = undefined;

  // Get startKey from query for pagination
  const startKey = searchParams.get("startKey");
  if (startKey) {
    try {
      lastEvaluatedKey = JSON.parse(decodeURIComponent(startKey));
    } catch (e) {
      console.error("Invalid startKey:", e);
      return NextResponse.json({ error: "Invalid startKey" }, { status: 400 });
    }
  }

  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE!,
    IndexName: "live-timestamp-index",
    KeyConditionExpression: "live = :liveVal",
    ExpressionAttributeValues: {
      ":liveVal": "true"
    },
    ProjectionExpression: "id, resumeData.#name, #timestamp",
    ExpressionAttributeNames: {
      "#name": "name",
      "#timestamp": "timestamp"
    },
    ScanIndexForward: false, // Most recent first
    Limit: limit,
    ExclusiveStartKey: lastEvaluatedKey || undefined
  };

  try {
    const data = await docClient.send(new QueryCommand(params));

    const response = {
      items: data.Items?.map(item => ({
        id: item.id,
        name: item.resumeData?.name || "Unknown",
        timestamp: item.timestamp
      })) || [],
      nextStartKey: data.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(data.LastEvaluatedKey))
        : null,
      currentPage: page,
      hasNextPage: !!data.LastEvaluatedKey,
      totalItems: data.Items?.length || 0
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("DynamoDB error:", err);
    return NextResponse.json({ error: "Error fetching portfolios" }, { status: 500 });
  }
}