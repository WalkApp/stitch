import Controller from '../base/controller';
import WelcomeView from '../views/welcome';
import SigninView from '../views/signin';
import SignupView from '../views/signup';


export default class WelcomeController extends Controller {
  index (ctx, done) {
    this.renderView(WelcomeView, done);
  }

  signin (ctx, done) {
    this.renderView(SigninView, done);
  }

  signup (ctx, done) {
    this.renderView(SignupView, done);
  }
}
