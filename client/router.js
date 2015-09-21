import BaseRouter from './base/router';
import vent from './modules/vent';
import user from './modules/user';


export default class Router extends BaseRouter {
  run () {
    super.run();
    vent.on('user:signin', () => this.routeTo('/user'));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  middleware () {
    // this.use('/', notAuth);
    // this.use('/signin', notAuth);
    // this.use('/signup', notAuth);
    // this.use('/user/:username', auth);
    // this.use('/user', auth);
    // this.use('/search', auth);
  }

  redirect () {
    this.use('/user', () => this.page.redirect(`/user/${user.get('username')}`));
  }

  router () {
    this.route('/', 'welcome.index');
    this.route('/signin', 'welcome.signin');
    this.route('/signup', 'welcome.signup');
    this.route('/search', 'search.index');
    this.route('/user/:username', 'user.index');
    this.route('/user/:username/upcoming', 'user.upcoming');
  }
}

Router.prototype.controllers = {
  welcome: require('./controllers/welcome'),
  user: require('./controllers/user'),
  search: require('./controllers/search'),
};

Router.prototype.auth = require('./middlewares/auth');
Router.prototype.notAuth = require('./middlewares/not_auth');
