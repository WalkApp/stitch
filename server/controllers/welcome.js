import ViewController from '../base/view_controller';


export default class WelcomeContrller extends ViewController {
  welcome (req, res) {
    this.renderView(req, res, 'welcome');
  }

  signin (req, res) {
    this.renderView(req, res, 'signin');
  }

  router () {
    this.get('/', this.welcome);
    this.get('/signin', this.signin);
  }
}

WelcomeContrller.prototype.logPrefix = 'main-controller';
