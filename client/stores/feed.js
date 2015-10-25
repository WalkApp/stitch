import alt from '../alt';
import CollectionStore from '../base/collection_store';
import feedActions from '../actions/feed';


class FeedStore extends CollectionStore {
  constructor () {
    super();
    this.bindActions(feedActions);
  }
}

export default alt.createStore(FeedStore, 'FeedStore');
