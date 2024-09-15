import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import settings from '../config/settings.js';

const swaggerDocument = JSON.parse(
  readFileSync(resolve('api/src/frameworks/docs/swagger.json'), 'utf-8')
);


swaggerDocument.servers[0].url = settings.APP_URL;
swaggerDocument.servers[0].description = settings.LOCAL?'Development':'Production';

export const docsUI = swaggerUi.serve;
export const docsRoutes = swaggerUi.setup(swaggerDocument);

export default {
  docsUI,
  docsRoutes
};
