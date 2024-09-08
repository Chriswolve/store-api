import { getMessage } from './i18n.js';

class HttpResponse {
  constructor({ status = 200, message, url = null, data = null, extra= null, args = {}}) {
    this.message = message;
    this.status = status;
    this.url = url;
    this.data = data;
    this.extra = extra;
    this.args = args;
  }

  toJSON() {

    return {
      message: getMessage(this),
      status: this.status,
      url: this.url,
      data: this.data?? undefined,
      ...this.extra
    };
  }

}

export default HttpResponse;
