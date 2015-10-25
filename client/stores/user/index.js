import alt from '../../alt';
import Store from '../../base/store';
import userActions from '../../actions/user';


class UserStore extends Store {
  constructor () {
    super();
    this.followerCount = 0;
    this.followingCount = 0;
    this.user = null;

    this.bindActions(userActions);
  }

  onUnfollow () {
    this.followerCount -= 1;
  }

  onFollow () {
    this.followerCount += 1;
  }
}

export default alt.createStore(UserStore, 'UserStore');
