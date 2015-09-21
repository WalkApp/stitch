import alt from '../alt';
import userActions from '../actions/user';


export default alt.createStore(class UserStore {
  constructor() {
    this.bindActions(userActions);
    this.user = {};
    this.posts = [];
    this.events = [];
  }
});
