import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.LISTS_TABLE;

export const handler = async (event) => {

    const body = JSON.parse(event.body);
    try {
        await dynamo.send(
            new PutCommand({
            TableName: tableName,
            Item: {
                    ...body
                },
            })
        );
    }catch(error){
        return {
            ...error
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT"
        },
    }
};
