import getMessage from "./i18n.js";

class HttpError {
  #stack = ''
  #args = {}
  #data = null
  #url = null

  constructor({ status, message, stack, url = null, data = null, args = {} }) {
    this.message = message;
    this.status = status;
    this.#stack = stack;
    this.#args = args;
    this.#data = data;
    this.#url = url;
  }

  get stack() {
    return this.#stack.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  get url() {
    return this.#url;
  }
  get data() {
    return this.#data;
  }
  get args() {
    return this.#args;
  }

  toJSON(join = false) {

    return {
      message: getMessage(this),
      status: this.status,
      url: this.url,
      errors: this.data ?? undefined,
      stack: !join ? this.stack : this.stack.join('\n'),
    };
  }

}

export default HttpError;
