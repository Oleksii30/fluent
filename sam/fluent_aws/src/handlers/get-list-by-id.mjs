import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;

const lambdaHandler = async (event) => {

  const listId = event.pathParameters.listId;
  const userId = event.queryStringParameters.userId;

  const params = {
    TableName : tableName,
    Key: { createdAt: Number(listId), userId: userId },
  };

  const data = await dynamo.send(new GetCommand(params));

  if(!data.Item){
    throw new createError(404, 'This list does not exist!');
  }

  const item = data.Item;

  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  };

  return response;
}

export const handler = middy()
  .use(cors())
  .use(httpErrorHandler())
  .handler(lambdaHandler)
