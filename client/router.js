import BaseRouter from './base/router';
import vent from './modules/vent';


class Router extends BaseRouter {
  constructor () {
    super();
    vent.on('user:signin', () => this.routeTo('/user'));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  router () {
    this.route('/', 'welcome.index');
    this.route('/signin', 'welcome.signin');
    this.route('/signup', 'welcome.signup');
    this.route('/user', 'user.index');
  }
}

Router.prototype.controllers = {
  welcome: require('./controllers/welcome'),
  user: require('./controllers/user')
};

export default new Router();
