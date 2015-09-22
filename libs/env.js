import _ from 'lodash';


class Environment {
  constructor () {
    if (process.browser) {
      this.attributes = window.app.env;
    }
  }

  set (key, value) {
    this.attributes[key] = value;
  }

  get (key) {
    return this.attributes[key];
  }

  toJSON () {
    return _.clone(this.attributes);
  }
}

export default new Environment();

