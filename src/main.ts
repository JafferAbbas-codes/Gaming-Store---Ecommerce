import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static('public')); 
 app.use('/static/img', express.static('files'));
  await app.listen(3001);
  
}
bootstrap();
