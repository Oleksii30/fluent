import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;


export const handler = async (event) => {

  const listId = event.queryStringParameters.listId;
  const userId = event.queryStringParameters.userId;

  var params = {
    TableName : tableName,
    Key: { createdAt: Number(listId), userId: userId },
  };

  await dynamo.send(new DeleteCommand(params));

  const response = {
    statusCode: 201,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    }
  };

  return response;
}
