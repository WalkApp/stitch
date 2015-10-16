import Controller from '../base/controller';
import SearchView from '../views/search';
import UsersCollection from '../models/users';


export default class SearchController extends Controller {
  index (ctx, done) {
    let q = ctx.query.q;
    let users = this.wrapModel(new UsersCollection());

    if (q) {
      users.filterModel = {
        username: {contains: q},
      };
    }

    let dfd = this.xhrs.users = users.fetch();
    dfd.fail(xhr => this.renderErrorView(xhr, done));
    dfd.then(() => {
      this.setInitData({
        SearchStore: {
          users: users.toJSON(),
        },
      });

      this.renderView(SearchView, done);
    });
  }
}
