import Controller from '../base/controller';
import ProfileView from '../views/profile';
import UserModel from '../models/user';


export default class ProfileController extends Controller {
  index (ctx, done) {
    let user = this.wrapModel(new UserModel());
    user.username = 'profile';

    let dfd = this.xhrs.profile = user.fetch();
    dfd.fail(xhr => this.renderErrorView(xhr, done));
    dfd.then(() => {
      this.setInitData({
        ProfileStore: {
          user: user.toJSON(),
        },
      });

      this.renderView(ProfileView, done);
    });
  }
}
