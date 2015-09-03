import Model from '../base/model';
import Backbone from 'backbone';
import vent from './vent';


class Session extends Model {
  initialize () {
    if (!process.browser) {
      return;
    }

    this.loaded = false;

    var dfd = this.fetch();
    dfd.done(this.handleLoad.bind(this));
    this.on('change', this.updated, this);
  }

  handleLoad () {
    this.loaded = true;
    vent.trigger('session:loaded');
  }

  reset () {
    var
      that = this,
      dfd = this.destroy();

    dfd.always(function () {
      that.clear({ silent: true });
      that.set(that.defaults, { silent: true });
      that.save();
    });

    return dfd;
  }

  updated () {
    this.set({ timestamp: Date.now() }, { silent: true });
    this.save();
  }
}

Session.prototype.defaults = {
  _id: 'static',
  timestamp: 0
};

if (process.browser) {
  Session.prototype.localStorage = new Backbone.LocalStorage('walk:session');
}

export default new Session();
