import BaseRouter from './base/router';
import vent from './modules/vent';
import auth from './middlewares/auth';
import user from './modules/user';


class Router extends BaseRouter {
  constructor () {
    super();
    vent.on('user:signin', () => this.routeTo('/user'));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  middleware () {
    this.page('/user/:username', auth);
    this.page('/user', auth);
  }

  redirect () {
    this.page('/user', () => this.page.redirect(`/user/${user.username}`));
  }

  router () {
    this.route('/', 'welcome.index');
    this.route('/signin', 'welcome.signin');
    this.route('/signup', 'welcome.signup');
    this.route('/user/:username', 'user.index');
  }
}

Router.prototype.controllers = {
  welcome: require('./controllers/welcome'),
  user: require('./controllers/user')
};

export default new Router();
