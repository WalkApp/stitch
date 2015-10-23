import alt from '../../alt';
import CollectionStore from '../../base/collection_store';
import userEventsActions from '../../actions/user/posts';


class UserEventsStore extends CollectionStore {
  constructor () {
    super();
    this.bindActions(userEventsActions);
  }
}

export default alt.createStore(UserEventsStore);
