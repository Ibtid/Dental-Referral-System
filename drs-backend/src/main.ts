import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { DBService } from './database.service';
import * as cookieParser from 'cookie-parser';
import { deleteExpiredFiles } from './util/cron-job';

const bootstrapping = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('drs');
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // BigInt.prototype["toJSON"] = function() { return this.toString() };
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('DRS Swagger')
    .setDescription('Kaz Software')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // End of Swagger
  // Prisma
  const databaseService: DBService = app.get(DBService);
  databaseService.enableShutdownHooks(app);
  // End of Prisma
  app.use(cookieParser());
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  deleteExpiredFiles.start();
};
bootstrapping();
