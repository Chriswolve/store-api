export class Controller {
  constructor() {
  }
  sendResponse(res,next,data) {
    res.locals.responseData = data;
    next();
  }
}

export default Controller;
