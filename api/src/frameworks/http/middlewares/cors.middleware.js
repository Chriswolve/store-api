import cors from 'cors';
import settings from '../../config/settings.js';
import Boom from '@hapi/boom';

const whitelist = settings.CORS_ALLOWED_ORIGINS;  // Lista de dominios permitidos
const allowMethods = settings.CORS_ALLOWED_METHODS;  // Lista de métodos permitidos

const corsOptions = {
  origin: (origin, callback) => {
    // Si el origen está en la lista blanca o es undefined (en caso de que sea el mismo origen)

    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(
        Boom.forbidden(
          'Origin not allowed',  // Mensaje de error
          { data: { origin : origin, allowed : whitelist } }
        )
      );  // Si no está permitido
    }
  },
  methods: allowMethods,  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],  // Headers permitidos
  credentials: true,  // Si los credenciales (cookies, authorization headers) están permitidos
};

export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
