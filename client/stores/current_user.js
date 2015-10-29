import alt from '../alt';
import { getValue } from 'libs/utils';
import currentUserActions from '../actions/current_user';


class CurrentUserStore {
  constructor () {
    this.bindActions(currentUserActions);
    this.user = null;
  }

  onSignin (user) {
    this.user = user;
  }

  onSignout () {
    this.user = null;
  }

  onUpdate (user) {
    this.user.full_name = user.full_name;
    this.user.image_url = user.image_url;
  }

  static get (keyPath) {
    let user = this.getState().user;

    if (!keyPath) {
      return user;
    } else {
      return getValue(keyPath, user);
    }
  }

  static authorized () {
    return !!this.get();
  }
};

export default alt.createStore(CurrentUserStore, 'CurrentUserStore');
