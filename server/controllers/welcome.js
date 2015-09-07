import ViewController from '../base/view_controller';


export default class WelcomeController extends ViewController {
  constructor () {
    super();
    this.logPrefix = 'welcome-controller';
  }

  welcome (req, res) {
    this.renderView(req, res, 'welcome');
  }

  signin (req, res) {
    this.renderView(req, res, 'signin');
  }

  signup (req, res) {
    this.renderView(req, res, 'signup');
  }

  router () {
    this.get('/', this.welcome);
    this.get('/signin', this.signin);
    this.get('/signup', this.signup);
  }
}
