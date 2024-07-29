import { translate } from '@vitalets/google-translate-api';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const lambdaHandler = async (event) => {

  const word = event.queryStringParameters.word;

  const { translation } = await translate(word, { to: 'uk' });

  if(!translation){
    throw new createError(404, 'Failed to translate the word');
  }

  const item = {text: translation};

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
