import ViewController from '../base/view_controller';


export default class UserController extends ViewController {
  user (req, res) {
    this.renderEmptyView(req, res, 'user');
  }

  router () {
    this.get('/user/:username', this.user);
  }
}

UserController.prototype.logPrefix = 'user-controller';
