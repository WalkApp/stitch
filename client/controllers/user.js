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
    let { username } = ctx.params;
    let user = this.wrapModel(new UserModel());
    let posts = this.wrapModel(new PostsCollection());
    let followers = this.wrapModel(new FollowersCollection());
    let followings = this.wrapModel(new FollowingsCollection());

    user.username = username;
    posts.username = username;
    posts.order = '-created';
    followers.username = username;
    followings.username = username;

    this.xhrs.user = user.fetch();
    this.xhrs.posts = posts.fetch();
    this.xhrs.followers = followers.fetchCount();
    this.xhrs.followings = followings.fetchCount();

    let dfd = Q.all([this.xhrs.user, this.xhrs.posts, this.xhrs.followers, this.xhrs.followings]);
    dfd.done(() => {
      this.setInitData({
        UserStore: {
          user: user.toJSON(),
          posts: posts.toJSON(),
          followerCount: followers.count,
          followingCount: followings.count,
        },
      });

      this.renderView(UserView, done);
    });
  }

  upcoming (ctx, done) {
    let { username } = ctx.params;
    let user = this.wrapModel(new UserModel());
    let events = this.wrapModel(new EventsCollection());

    user.username = username;
    events.username = username;
    events.order = '-created';

    this.xhrs.user = user.fetch();
    this.xhrs.events = events.fetch();

    let dfd = Q.all([this.xhrs.user, this.xhrs.events]);
    dfd.done(() => {
      this.setInitData({
        UserStore: {
          user: user.toJSON(),
          events: events.toJSON(),
        },
      });

      this.renderView(UpcomingView, done);
    });
  }
}
