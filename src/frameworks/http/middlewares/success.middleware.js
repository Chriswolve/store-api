import HttpResponse from "../../../utils/HttpResponse.js";

export function successHandler(req, res, next) {
  const { responseData } = res.locals;
  // Obtener la respuesta exitosa de res.locals
  if (responseData) {
    //console.log('Response DATA:',responseData)
    const response = new HttpResponse({
      ...responseData,
      url : req.originalUrl
    })

    res.status(response.status).json(response.toJSON());
  } else {
    next();  // Si no hay respuesta exitosa, pasar al siguiente middleware
  }
}
