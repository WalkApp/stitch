import Model from '../base/model';
import vent from './vent';
import session from './session';
import $ from 'jquery';


class User extends Model {
  _setTokenHeaders () {
    var headers = { 'X-Access-Token': this.get('token').value };
    $.ajaxSetup({ headers });
  }

  _unsetTokenHeaders () {
    var headers = { 'X-Access-Token': '' };
    $.ajaxSetup({ headers });
  };

  url () {
    return `${this.apiRoot}/user`;
  }

  defaults () {
    return {
      _id: 0,
      timestamp: 0
    };
  }

  initialize () {
    if (!process.browser) {
      return;
    }

    var
      dfd,
      _id = session.get('user_id');

    if (!_id) {
      return;
    }

    this.set({ _id });
    this.fetch();
    this._setTokenHeaders();

    dfd = this.fetch({ ajaxSync: true });
    dfd.fail(() => this.signout());

    dfd.done((resp) => {
      this.set({ timestamp: Date.now() }, { silent: true });
      this.save(resp);
    });
  }

  reset () {
    this.destroy();
    this.clear({ silent: true });
    this.set(this.defaults(), { silent: true });
    this.save();
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

  signout () {
    this.reset();
    this._unsetTokenHeaders();
    session.reset();
    vent.trigger('user:signout');
  }

  authorized () {
    return !!this.id;
  }
}

if (process.browser) {
  User.prototype.localStorage = new Backbone.LocalStorage('walk:user');
}

export default new User();
