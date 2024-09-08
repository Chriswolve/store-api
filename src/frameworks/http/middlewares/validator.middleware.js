import Boom from '@hapi/boom';
import getMessage from '../../../utils/i18n.js';

function formatCustomError(error) {
  const details = [];
  error.details.forEach(err => {
    if(err.type === 'any.custom'){
      details.push({
        message: err.context.message,
        path: err.context.path,
      });
    }
  });

  if(details.length > 0){
    error.details = details;
  }
  return error;
}

function validatorHandler(schema, property) {
  return (req, res, next) => {
    let { error } = schema.validate(req[property], {
      abortEarly: false,  // Retorna todos los errores
      convert: false      // Desactiva la conversión automática de tipos
    });
    if (error) {
      // format custom error
      error = formatCustomError(error);

      next(
        Boom.badRequest('Validation Error', {
          data: error.details.map(err => ({
            message: getMessage({ message: err.message}),
            path: err.path,
          })),
        })
      );;
    }else{
      next();
    }
  };
}

export default validatorHandler;
