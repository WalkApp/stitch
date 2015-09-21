import alt from '../alt';


class UserActions {
  constructor () {
    this.generateActions('addPost', 'addEvent');
  }
}

export default alt.createActions(UserActions);
