import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cacheServer;

export const handler = async (event, context) => {
  if (!cacheServer) {
    const nestApp = await await NestFactory.create(AppModule);
    await nestApp.init();
    cacheServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cacheServer(event, context);
};
