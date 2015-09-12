import BaseRouter from './base/router';
import vent from './modules/vent';
import auth from './middlewares/auth';
import notAuth from './middlewares/not_auth';
import user from './modules/user';


class Router extends BaseRouter {
  constructor () {
    super();
    vent.on('user:signin', () => this.routeTo('/user'));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  middleware () {
    this.page('/', notAuth);
    this.page('/signin', notAuth);
    this.page('/signup', notAuth);
    this.page('/user/:username', auth);
    this.page('/user', auth);
    this.page('/search', auth);
  }

  redirect () {
    this.page('/user', () => this.page.redirect(`/user/${user.get('username')}`));
  }

  router () {
    this.route('/', 'welcome.index');
    this.route('/signin', 'welcome.signin');
    this.route('/signup', 'welcome.signup');
    this.route('/user/:username', 'user.index');
    this.route('/search', 'search.index');
    this.route('/user/:username/upcoming', 'user.upcoming');
  }
}

Router.prototype.controllers = {
  welcome: require('./controllers/welcome'),
  user: require('./controllers/user'),
  search: require('./controllers/search'),
};

export default new Router();
