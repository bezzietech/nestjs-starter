import { OpenAPIObject } from '@nestjs/swagger';
import { createWriteStream, writeFileSync } from 'fs';
import { get } from 'http';
import { resolve } from 'path';

export function setupSwaggerFiles(
  host = '0.0.0.0',
  port = 3000,
  document: OpenAPIObject,
) {
  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(
      `http://${host}:${port}/swagger/swagger-ui-bundle.js`,
      function (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
        console.log(
          `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
        );
      },
    );
    get(`http://${host}:${port}/swagger/`, function (response) {
      response.pipe(createWriteStream('swagger-static/index.html'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/index.html'`,
      );
    });

    get(
      `http://${host}:${port}/swagger/swagger-ui-init.js`,
      function (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
        console.log(
          `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
        );
      },
    );

    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);

    get(
      `http://${host}:${port}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`http://${host}:${port}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
}
