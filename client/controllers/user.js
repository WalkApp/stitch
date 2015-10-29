import Q from 'q';
import Controller from '../base/controller';
import UserView from '../views/user';
import UpcomingView from '../views/upcoming';
import UserModel from '../models/user';
import PostsCollection from '../models/posts';
import EventsCollection from '../models/events';
import FollowersCollection from '../models/followers';
import FollowingsCollection from '../models/followings.js';


export default class UserController extends Controller {
  index (ctx, done) {
    if (ctx.query.section === 'upcoming') {
      this.upcoming(ctx, done);
    } else {
      this.posts(ctx, done);
    }
  }

  posts (ctx, done) {
    let { username } = ctx.params;
    let data = { params: { username }, order: '-created' };
    let posts = this.wrapModel(new PostsCollection(null, null, data));

    this.xhrs.posts = posts.fetch();

    let dfd = Q.all([this.fetchUser(username), this.xhrs.posts]);
    dfd.fail(xhr => this.renderErrorView(xhr, done));
    dfd.then(() => {
      this.setInitData({
        UserStore: this.getUserStoreData(),
        UserPostsStore: {
          collection: posts.toJSON(),
        },
      });

      this.renderView(UserView, done);
    });
  }

  upcoming (ctx, done) {
    let { username } = ctx.params;
    let data = { params: { username }, order: '-created' };
    let events = this.wrapModel(new EventsCollection(null, null, data));

    this.xhrs.events = events.fetch();

    let dfd = Q.all([this.fetchUser(username), this.xhrs.events]);
    dfd.fail(xhr => this.renderErrorView(xhr, done));
    dfd.then(() => {
      this.setInitData({
        UserStore: this.getUserStoreData(),
        UserEventsStore: {
          collection: events.toJSON(),
        },
      });

      this.renderView(UpcomingView, done);
    });
  }

  fetchUser (username) {
    let data = { params: { username } };

    this.user = this.wrapModel(new UserModel());
    this.user.username = username;

    this.followers = this.wrapModel(new FollowersCollection(null, null, data));
    this.followings = this.wrapModel(new FollowingsCollection(null, null, data));

    this.xhrs.user = this.user.fetch();
    this.xhrs.followers = this.followers.fetchCount();
    this.xhrs.followings = this.followings.fetchCount();

    return Q.all([this.xhrs.user, this.xhrs.followers, this.xhrs.followings]);
  }

  getUserStoreData () {
    return {
      user: this.user.toJSON(),
      followerCount: this.followers.count,
      followingCount: this.followings.count,
    };
  }
}
