import express from 'express';
import settings from '../config/settings.js';

import {connectDB} from '../database/db.js';
import setRoutes from '../../routes/index.js';
import pathToSwaggerUi from 'swagger-ui-dist';

import {
  errorLog,
  errorHandler,
  errorResponseHandler,
  boomErrorHandler
} from './middlewares/error.middleware.js';

import { successHandler } from './middlewares/success.middleware.js';

import corsMiddleware from './middlewares/cors.middleware.js';


const app = express();
const port = settings.PORT;

// Middleware para parsear JSON
app.use(express.json());

// Middleware de CORS
app.use(corsMiddleware);

// Conectar a la base de datos
connectDB();
// Aplicar rutas
setRoutes.call(app);

// Error handler middlewares
app.use(boomErrorHandler);  // Manejar errores de boom como CORS
app.use(errorLog);          // Registrar errores
app.use(errorHandler);      // Manejar otros errores
app.use(errorResponseHandler);  // Enviar respuesta de error

// Middleware de éxito
app.use(successHandler);



// Servir los staticos de Swagger
const swaggerUiPath = pathToSwaggerUi.absolutePath();
app.use('/api/v1/docs', express.static(swaggerUiPath));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en http://localhost:${port}`);


});
