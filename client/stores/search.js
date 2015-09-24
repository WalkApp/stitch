import alt from '../alt';
import searchActions from '../actions/search';


export default alt.createStore(class SearchStore {
  constructor () {
    this.bindActions(searchActions);
    this.users = [];
  }

  onPushUsers (users) {
    let items = this.users.items.concat(users.items);
    this.users = users;
    this.users.items = items;
  }
});
