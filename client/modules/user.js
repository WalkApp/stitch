import Model from '../base/model';
import vent from './vent';
import $ from 'jquery';
import env from 'libs/env';


class User extends Model {
  _setTokenHeaders () {
    let headers = { 'X-Access-Token': this.get('token').value };
    $.ajaxSetup({ headers });
  }

  _unsetTokenHeaders () {
    let headers = { 'X-Access-Token': '' };
    $.ajaxSetup({ headers });
  };

  url () {
    return `${this.apiRoot}/users/profile`;
  }

  initialize () {
    if (!process.browser) {
      return;
    }

    this.set(env.get('user'));
    if (this.authorized()) this._setTokenHeaders();
  }

  signin (data) {
    let user = null;

    let dfd = this.$({
      data,
      url: `${this.apiRoot}/auth`,
      type: 'post',
    })
    .then((_user) => {
      user = _user;

      return this.$({
        url: '/auth/login',
        type: 'post',
        data: user,
      });
    })
    .then(() => {
      this.set(user);
      this._setTokenHeaders();
      vent.trigger('user:signin');
    });

    return dfd;
  }

  signout () {
    let dfd = this.$('/auth/logout').done(() => {
      this.clear();
      this._unsetTokenHeaders();
      vent.trigger('user:signout');
    });

    return dfd;
  }

  authorized () {
    return !!this.id;
  }
}

export default new User();
