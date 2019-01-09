import debounce from 'lodash.debounce';

export default class Autosaver {
  constructor(method, options = {}) {
    this.method = debounce(method, options.delay || 5000, {
      maxWait: options.maxWait || 10000,
    });
    this.prevPush = null;
  }

  push(id, value) {
    if (value !== this.prevPush) {
      this.method(id, value);
      this.prevPush = value;
      return this;
    }
  }

  force() {
    this.method.flush();
    return this;
  }
}
