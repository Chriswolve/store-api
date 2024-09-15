import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import settings from '../config/settings.js';

const swaggerDocument = JSON.parse(
  readFileSync(resolve('api/src/frameworks/docs/swagger.json'), 'utf-8')
);

// Modificar el servidor según el entorno (local o producción)
swaggerDocument.servers[0].url = settings.APP_URL;
swaggerDocument.servers[0].description = settings.LOCAL ? 'Development' : 'Production';

// Ruta para Swagger UI
const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  customJs: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
};

// Configurar Swagger UI
export const docsUI = swaggerUi.serve;
export const docsRoutes = swaggerUi.setup(swaggerDocument, swaggerOptions);

export default {
  docsUI,
  docsRoutes,
};
