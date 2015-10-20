import Controller from '../base/controller';
import FeedView from '../views/feed';
import Feed from '../models/feed';


export default class FeedController extends Controller {
  index (ctx, done) {
    let feed = new Feed();
    let dfd = this.xhrs.feed = feed.fetch();

    dfd.fail(xhr => this.renderErrorView(xhr));
    dfd.then(() => {
      this.setInitData({
        FeedStore: {
          news: feed.toJSON(),
        },
      });

      this.renderView(FeedView, done);
    });
  }
}
