import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;

export const lambdaHandler = async (event) => {
	const userId = event.queryStringParameters.userId;

	const body = await dynamo.send(
		new QueryCommand({
			TableName: tableName,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				":userId": userId,
			}
		})
	);

	const response =  {
		statusCode: 200,
		body: JSON.stringify(body.Items),
	}

	return response;
};

export const handler = middy()
  .use(cors())
  .use(httpErrorHandler())
  .handler(lambdaHandler)
