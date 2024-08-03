import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.SETTINGS_TABLE;

const lambdaHandler = async (event) => {

	const body = JSON.parse(event.body);
	await dynamo.send(
		new PutCommand({
		TableName: tableName,
		Item: {
				...body
			},
		})
	);
	return {
		statusCode: 201,
	}
};

export const handler = middy()
  .use(cors())
  .use(httpErrorHandler())
  .handler(lambdaHandler)
