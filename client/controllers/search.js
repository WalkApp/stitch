import Controller from '../base/controller';
import SearchView from '../views/search';
import UsersCollection from '../models/users';


export default class SearchController extends Controller {
  index (ctx, done) {
    let searchText = ctx.query.q;
    let data = {};

    if (searchText) {
      data.filterModel = { username: { contains: searchText } };
    }

    let users = this.wrapModel(new UsersCollection(null, null, data));

    let dfd = this.xhrs.users = users.fetch();
    dfd.fail(xhr => this.renderErrorView(xhr, done));
    dfd.then(() => {
      this.setInitData({
        SearchUsersStore: {
          collection: users.toJSON(),
        },
      });

      this.renderView(SearchView, done);
    });
  }
}
