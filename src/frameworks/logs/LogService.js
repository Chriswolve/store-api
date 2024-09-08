import fs from 'fs';
import path from 'path';
import settings from '../config/settings.js';

const logDirectory = settings.LOG_DIRECTORY;
const logFilePath = path.join(logDirectory, 'app.log');

// Crear el directorio de logs si no existe
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

class LogService {
  static log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - INFO: ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  }

  static logError(error) {
    const timestamp = new Date().toISOString();
    const {message, stack} = error.toJSON();

    const logMessage = `${timestamp} - ERROR: ${message}\n${stack}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  }
}

export default LogService;
