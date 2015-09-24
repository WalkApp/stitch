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
    this.posts.items.unshift(post);
  }

  onAddEvent (event) {
    this.events.items.unshift(event);
  }

  onUnfollow () {
    this.followerCount -= 1;
  }

  onFollow () {
    this.followerCount += 1;
  }

  onPushPosts (posts) {
    let items = this.posts.items.concat(posts.items);
    this.posts = posts;
    this.posts.items = items;
  }

  onPushEvents (events) {
    let items = this.events.items.concat(events.items);
    this.events = events;
    this.events.items = items;
  }
});
