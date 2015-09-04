import ViewController from '../base/view_controller';


export default class UserController extends ViewController {
  user (req, res) {
    this.renderView(req, res, 'user');
  }

  router () {
    this.get('/user', this.user);
  }
}

UserController.prototype.logPrefix = 'user-controller';
