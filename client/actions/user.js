import alt from '../alt';


class UserActions {
  constructor () {
    this.generateActions('addPost', 'addEvent', 'follow', 'unfollow');
  }
}

export default alt.createActions(UserActions);
