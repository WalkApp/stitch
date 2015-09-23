import alt from '../alt';


class UserActions {
  constructor () {
    this.generateActions('addPost', 'addEvent', 'unfollow');
  }
}

export default alt.createActions(UserActions);
