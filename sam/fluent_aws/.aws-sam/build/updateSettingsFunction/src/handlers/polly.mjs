import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';
import { StartSpeechSynthesisTaskCommand, PollyClient } from "@aws-sdk/client-polly";
import { createClient } from 'redis';

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const pollyClient = new PollyClient({ region: "us-west-2" });

const redisClient = createClient({
  password: 'J35LQr4Fh3O1FoBBTRzKrb4MIPWcIdaL',
  socket: {
    host: 'redis-18107.c285.us-west-2-2.ec2.redns.redis-cloud.com',
    port: 18107
  }
});

const bucket = process.env.POLLY_BUCKET;

const lambdaHandler = async (event) => {
  const { word, code, voiceId } = event.queryStringParameters;

  await redisClient.connect();
  const url = await redisClient.get(word);
  if(url) {
    const response = {
      statusCode: 200,
      body: url
    };
    await redisClient.disconnect();
    return response;
  }

  const params = {
    OutputFormat: "mp3",
    LanguageCode: code,
    OutputS3BucketName: bucket,
    Text: word,
    TextType: "text",
    VoiceId: voiceId,
    SampleRate: "22050",
  };

  let result;

  try{
    result = await pollyClient.send(new StartSpeechSynthesisTaskCommand(params));
  }catch(error){
    await redisClient.disconnect();
    throw new createError(401, error.message);
  }

  const {OutputUri, TaskStatus} = result.SynthesisTask;

  if(TaskStatus === 'failed'){
    throw new createError(401, 'Failed to create audio');
  }

  await redisClient.set(word, OutputUri);
  await redisClient.disconnect();

  await delay(2500);

  const response = {
    statusCode: 200,
    body: OutputUri
  };

  return response;
}

export const handler = middy()
  .use(cors())
  .use(httpErrorHandler())
  .handler(lambdaHandler)


