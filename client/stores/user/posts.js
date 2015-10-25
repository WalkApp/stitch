import alt from '../../alt';
import CollectionStore from '../../base/collection_store';
import userPostsActions from '../../actions/user/posts';


class UserPostsStore extends CollectionStore {
  constructor () {
    super();
    this.bindActions(userPostsActions);
  }
}

export default alt.createStore(UserPostsStore, 'UserPostsStore');
