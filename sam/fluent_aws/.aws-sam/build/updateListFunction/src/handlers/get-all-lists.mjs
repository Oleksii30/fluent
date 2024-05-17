import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { middy } from '@middy/core';
import { httpErrorHandler } from '@middy/http-error-handler';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;

const handler = async (event) => {
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

    // const response =  {
    //     statusCode: 200,
    //     headers: {
    //         "Access-Control-Allow-Headers" : "Content-Type",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET"
    //     },
    //     body: JSON.stringify(body.Items)
    // }

    return JSON.stringify(body.Items);
};

exports.handler = middy(handler).use(httpErrorHandler());
