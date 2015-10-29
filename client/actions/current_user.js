import alt from '../alt';


class CurrentUserActions {
  constructor () {
    this.generateActions(
      'signin',
      'signout',
      'update'
    );
  }
}

export default alt.createActions(CurrentUserActions);
