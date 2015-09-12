import ViewController from '../base/view_controller';


export default class UserController extends ViewController {
  constructor () {
    super();
    this.logPrefix = 'user-controller';
  }

  user (req, res) {
    this.renderEmptyView(req, res, 'user');
  }

  upcomming (req, res) {
    this.renderEmptyView(req, res, 'upcomming');
  }

  router () {
    this.get('/user/:username', this.user);
    this.get('/user/:username/upcomming', this.upcomming);
  }
}
