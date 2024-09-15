import swaggerUi from 'swagger-ui-express';
import pathToSwaggerUi from 'swagger-ui-dist';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import settings from '../config/settings.js';

const swaggerDocument = JSON.parse(
  readFileSync(resolve('api/src/frameworks/docs/swagger.json'), 'utf-8')
);

swaggerDocument.servers[0].url = settings.APP_URL;
swaggerDocument.servers[0].description = settings.LOCAL ? 'Development' : 'Production';

// Configurar para usar el CDN de Swagger UI
const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  customJs: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
  customJsStandalonePreset: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
};

export const docsUI = swaggerUi.serve;
export const docsRoutes = swaggerUi.setup(swaggerDocument, swaggerOptions);
export const docsPath = pathToSwaggerUi.absolutePath();

export default {
  docsUI,
  docsRoutes,
  docsPath,
};
