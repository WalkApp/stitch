import alt from '../alt';
import Store from '../base/store';


class ProfileStore extends Store {
  constructor () {
    super();
    this.user = null;
  }
}

export default alt.createStore(ProfileStore);
