import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;


const lambdaHandler = async (event) => {

  const listId = event.queryStringParameters.listId;
  const userId = event.queryStringParameters.userId;

  const params = {
    TableName : tableName,
    Key: { createdAt: Number(listId), userId: userId },
  };

  await dynamo.send(new DeleteCommand(params));

  const response = {
    statusCode: 204,
  };

  return response;
}

export const handler = middy()
  .use(cors())
  .use(httpErrorHandler())
  .handler(lambdaHandler)
