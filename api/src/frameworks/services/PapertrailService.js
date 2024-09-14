import winston from 'winston';
import {Syslog} from 'winston-syslog';

// Configurar la conexión a Papertrail vía Syslog
const syslogTransport = new Syslog({
  host: 'logs4.papertrailapp.com',  // Host de Papertrail
  port: 10434,  // Puerto de Papertrail (TCP o UDP)
  protocol: 'tls',  // Protocolo a usar (TLS es recomendado)
  app_name: 'my-store',  // Nombre de la aplicación o servicio
  eol: '\n'  // Fin de línea para separar los logs
});
const logger = winston.createLogger({
  transports: [ // Logs en consola local
    syslogTransport  // En producción, enviar logs a Papertrail
  ].filter(Boolean)  // Elimina los transportes nulos
});

export default logger;
