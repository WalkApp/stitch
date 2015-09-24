import alt from '../alt';


class UserActions {
  constructor () {
    this.generateActions(
      'addPost',
      'addEvent',
      'follow',
      'unfollow',
      'pushPosts',
      'pushEvents'
    );
  }
}

export default alt.createActions(UserActions);
