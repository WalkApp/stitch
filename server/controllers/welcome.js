import ViewController from '../base/view_controller';


export default class WelcomeContrller extends ViewController {
  welcome (req, res) {
    this.renderView(req, res, 'welcome')
  }

  router () {
    this.get('/', this.welcome);
  }
}

WelcomeContrller.prototype.logPrefix = 'main-controller';
