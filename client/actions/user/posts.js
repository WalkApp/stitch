import alt from '../../alt';


class UserPostsActions {
  constructor () {
    this.generateActions(
      'loadMore',
      'unshiftItem'
    );
  }
}

export default alt.createActions(UserPostsActions);
