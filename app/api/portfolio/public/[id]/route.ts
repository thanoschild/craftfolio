import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo"; 

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const queryParams = {
    TableName: process.env.AWS_DYNAMODB_TABLE!,
    IndexName: "id-live-index", 
    KeyConditionExpression: "#id = :idVal AND #live = :liveVal",
    ExpressionAttributeNames: {
      "#id": "id",
      "#live": "live",
    },
    ExpressionAttributeValues: {
      ":idVal": id,
      ":liveVal": "true",
    },
    Limit: 1,
  };

  try {
    const result = await docClient.send(new QueryCommand(queryParams));
    if (result.Items && result.Items.length > 0) {
      return NextResponse.json(result.Items[0]);
    } else {
      return new NextResponse("Not found", { status: 404 });
    }
  } catch (err) {
    console.error("DynamoDB Query Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
