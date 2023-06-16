import { Logger } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import { createWriteStream, writeFileSync } from 'fs';
import { get } from 'http';
import { resolve } from 'path';

export function setupSwaggerFiles(
  host: string,
  port: number,
  document: OpenAPIObject,
) {
  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(`http://${host}:${port}/swagger/swagger-ui-bundle.js`, (response) => {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      Logger.log(
        "Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'",
        'SwaggerDocs',
      );
    });
    get(`http://${host}:${port}/swagger/`, (response) => {
      response.pipe(createWriteStream('swagger-static/index.html'));
      Logger.log(
        "Swagger UI bundle file written to: '/swagger-static/index.html'",
        'SwaggerDocs',
      );
    });

    get(`http://${host}:${port}/swagger/swagger-ui-init.js`, (response) => {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      Logger.log(
        "Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'",
        'SwaggerDocs',
      );
    });

    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    Logger.log(
      "Swagger JSON file written to: '/swagger-static/swagger.json'",
      'SwaggerDocs',
    );

    get(
      `http://${host}:${port}/swagger/swagger-ui-standalone-preset.js`,
      (response) => {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        Logger.log(
          "Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'",
          'SwaggerDocs',
        );
      },
    );

    get(`http://${host}:${port}/swagger/swagger-ui.css`, (response) => {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      Logger.log(
        "Swagger UI css file written to: '/swagger-static/swagger-ui.css'",
        'SwaggerDocs',
      );
    });
  }
}
