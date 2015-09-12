import ViewController from '../base/view_controller';


export default class UserController extends ViewController {
  constructor () {
    super();
    this.logPrefix = 'user-controller';
  }

  user (req, res) {
    this.renderEmptyView(req, res, 'user');
  }

  upcoming (req, res) {
    this.renderEmptyView(req, res, 'upcoming');
  }

  router () {
    this.get('/user/:username', this.user);
    this.get('/user/:username/upcoming', this.upcoming);
  }
}
