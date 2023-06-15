import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupServer } from './util/setupServer';
import { config } from 'dotenv';
import { INestApplication } from '@nestjs/common';

function setupSwaggerDocument(app: INestApplication) {
  const appTitle = process.env.SWAGGER_APP_TITLE ?? 'NestJS Starter';
  const version = process.env.APP_VERSION ?? '1.0.0';

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appTitle)
    .setDescription(`API required to run ${appTitle} v${version}`)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, document);
  return document;
}

async function bootstrap() {
  config();

  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);
  const openApiDocument = setupSwaggerDocument(app);

  const { port, host } = setupServer();

  await app.listen(port, host, async () => {
    const { Logger } = await import('@nestjs/common');
    Logger.log(`Nest App listening at http://${host}:${port}`, 'AppController');

    const { setupSwaggerFiles } = await import('./util/setupSwagger');
    setupSwaggerFiles(host, port, openApiDocument);
  });
}
bootstrap();
