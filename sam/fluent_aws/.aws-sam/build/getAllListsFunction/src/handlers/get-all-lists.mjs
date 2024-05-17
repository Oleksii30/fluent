import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;

export const handler = async (event) => {
    const userId = event.queryStringParameters.userId;
    try {
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
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
            },
        }

        return response;
    }catch(error){
        const response =  {
            statusCode: error.$metadata.httpStatusCode,
            body: JSON.stringify(error),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
            },
        }
        return response;
    }
};

