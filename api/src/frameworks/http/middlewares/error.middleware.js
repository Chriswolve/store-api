import LogService from "../../services/LogService.js";
import HttpError from "../../../utils/HttpError.js";
import settings from "../../config/settings.js";
import logger from "../../services/PapertrailService.js";


export function boomErrorHandler(error, req, res, next) {

  if (error.isBoom) {
    const { output } = error;

    next(new HttpError({
      status: output.statusCode,
      message: output.payload.message,
      stack: error.stack,
      args: error.data?.args,
      data: error.data?.data,
      url: req.originalUrl,
    }));
  }
  else {
    next(error);
  }
}

export function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    next(error);
  } else {
    next(new HttpError({
      status: error.status || 500,
      message: error.message,
      stack: error.stack,
      url: req.originalUrl,
    }));
  }
}

export function errorLog(error, req, res, next) {
  // log the error
  if(settings.LOCAL){
    LogService.logError(error);
  }else{
    logger.error(JSON.stringify(error.toJSON(true), null, 2));
  }
  // continue with the next middleware
  next(error);
}

export function errorResponseHandler(error, req, res, _next) {
  // return the error response
  res.status(error.status).json(error.toJSON());
}



export default {
  boomErrorHandler,
  errorHandler,
  errorLog,
  errorResponseHandler
}

