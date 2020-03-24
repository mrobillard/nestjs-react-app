import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  let bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use(helmet());
  app.enable('trust proxy');

  app.enableCors();

  // app.useGlobalPipes(new ValidationPipe()); // TODO: class-validator package has error

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      // message: 'Too many requests from this IP, please try again later',
    }),
  );

  await app.listen(3005);
}
bootstrap();
