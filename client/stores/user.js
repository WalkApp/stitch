import alt from '../alt';
import searchActions from '../actions/search';


export default alt.createStore(class UserStore {
  constructor() {
    this.bindActions(searchActions);
    this.user = {};
    this.posts = [];
    this.events = [];
  }
});
