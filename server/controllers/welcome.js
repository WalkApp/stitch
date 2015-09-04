import ViewController from '../base/view_controller';


export default class WelcomeContrller extends ViewController {
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

WelcomeContrller.prototype.logPrefix = 'main-controller';
