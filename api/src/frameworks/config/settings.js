import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export default {
  APP_NAME: process.env.APP_NAME || 'mystore',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  LOCAL: process.env.LOCAL === 'true',
  PORT: process.env.PORT || 3000,
  DB_DRIVER: process.env.DB_DRIVER || 'mongodb',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_NAME: process.env.DB_NAME || 'mystore',
  DB_CLUSTER: process.env.DB_CLUSTER || 'mystore',
  API_PREFIX: process.env.API_PREFIX || 'api',
  LOG_DIRECTORY: process.env.LOG_DIRECTORY || 'logs',
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS?.split(',').map(e => e.trim()) || 'http://localhost:3000',
  CORS_ALLOWED_METHODS: process.env.CORS_ALLOWED_METHODS?.split(',').map(e => e.trim()) || ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  PAPERTRAIL_DOMAIN: process.env.PAPERTRAIL_DOMAIN || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 23726,
}
