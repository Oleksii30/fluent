import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;


export const handler = async (event) => {

  const listId = event.pathParameters.listId;
  const userId = event.queryStringParameters.userId;

  var params = {
    TableName : tableName,
    Key: { createdAt: Number(listId), userId: userId },
  };

  const data = await dynamo.send(new GetCommand(params));
  const item = data.Item;

  const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    },
    body: JSON.stringify(item)
  };

  return response;
}
