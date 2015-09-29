import BaseRouter from './base/router';
import vent from './modules/vent';
import currentUser from './stores/current_user';


export default class Router extends BaseRouter {
  run () {
    super.run();
    vent.on('user:signin', () => this.routeTo(`/user/${currentUser.get('username')}`));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  middleware () {
    this.use('/', this.notAuth);
    this.use('/signin', this.notAuth);
    this.use('/signup', this.notAuth);

    this.use('/search', this.auth);

    this.use('/user/:username', this.auth);
    this.use('/user/:username/upcoming', this.auth);

    this.use('/profile', this.auth);
  }

  router () {
    this.route('/', 'welcome.index');
    this.route('/signin', 'welcome.signin');
    this.route('/signup', 'welcome.signup');

    this.route('/search', 'search.index');

    this.route('/user/:username', 'user.index');
    this.route('/user/:username/upcoming', 'user.upcoming');

    this.route('/profile', 'profile.index');
  }
}

Router.prototype.controllers = {
  welcome: require('./controllers/welcome'),
  user: require('./controllers/user'),
  search: require('./controllers/search'),
  profile: require('./controllers/profile'),
};

Router.prototype.auth = require('./middlewares/auth');
Router.prototype.notAuth = require('./middlewares/not_auth');
