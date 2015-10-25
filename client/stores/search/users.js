import alt from '../../alt';
import CollectionStore from '../../base/collection_store';
import searchUsersActions from '../../actions/search/users';


class SearchUsersStore extends CollectionStore {
  constructor () {
    super();
    this.bindActions(searchUsersActions);
  }
}

export default alt.createStore(SearchUsersStore, 'SearchUsersStore');
