import Model from '../base/model';
import vent from './vent';
import session from './session';
import $ from 'jquery';


class User extends Model {
  _setTokenHeaders () {
    var headers = { 'X-Access-Token': this.get('token').value };
    $.ajaxSetup({ headers });
  }

  _fetch () {
    var
      dfd,
      _id = session.get('user_id');

    if (!_id) {
      return;
    }

    this.set({ _id });
    dfd = this.fetch();
    dfd.done(() => {
      this.loaded = true;
      this._setTokenHeaders();
      vent.trigger('user:loaded');
    });
  }

  defaults () {
    return {
      _id: 0,
      timestamp: 0
    };
  }

  initialize () {
    this.loaded = true;

    if (session.loaded) {
      this._fetch();
    } else {
      vent.once('session:loaded', () => this._fetch());
    }
  }

  reset () {
    var dfd = this.destroy();

    dfd.always(() => {
      this.clear({ silent: true });
      this.set(this.defaults(), { silent: true });
      this.save();
    });

    return dfd;
  }

  signin (data) {
    var dfd = this.$({
      url: `${this.apiRoot}/auth`,
      type: 'post',
      data: data
    });

    dfd.done((user) => {
      this.set({ timestamp: Date.now() }, { silent: true });
      this.save(user);
      session.set({ user_id: this.id });
      this._setTokenHeaders();
      vent.trigger('user:signin');
    });

    return dfd;
  }
}

if (process.browser) {
  User.prototype.localStorage = new Backbone.LocalStorage('walk:user');
}

export default new User();
