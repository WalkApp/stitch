import alt from '../../alt';


class UserActions {
  constructor () {
    this.generateActions(
      'follow',
      'unfollow'
    );
  }
}

export default alt.createActions(UserActions);
