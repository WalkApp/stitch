import alt from '../alt';
import userActions from '../actions/user';


export default alt.createStore(class UserStore {
  constructor () {
    this.bindActions(userActions);
    this.user = {};
    this.posts = [];
    this.events = [];
    this.followerCount;
    this.followingCount;
  }

  onAddPost (post) {
    this.posts.unshift(post);
  }

  onAddEvent (event) {
    this.events.unshift(event);
  }

  onUnfollow () {
    this.followerCount -= 1;
  }

  onFollow () {
    this.followerCount += 1;
  }
});
