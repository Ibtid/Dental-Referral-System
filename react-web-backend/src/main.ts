import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { DBService } from './db.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('Kaz Software')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // End of Swagger
  // Prisma
  const dbService: DBService = app.get(DBService);
  dbService.enableShutdownHooks(app);
  // End of Prisma
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });
  await app.listen(port || 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
