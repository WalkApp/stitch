import alt from '../alt';
import userActions from '../actions/user';


export default alt.createStore(class UserStore {
  constructor () {
    this.bindActions(userActions);
    this.isOwner = false;
    this.user = {};
    this.posts = [];
    this.events = [];
  }

  onAddPost (post) {
    this.posts.unshift(post);
  }

  onAddEvent (event) {
    this.events.unshift(event);
  }
});
