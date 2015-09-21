import alt from '../alt';
import searchActions from '../actions/search';


export default alt.createStore(class SearchStore {
  constructor() {
    this.bindActions(searchActions);
    this.users = [];
  }
});
