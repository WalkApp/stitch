import Controller from '../base/controller';


export default class ErrorController extends Controller {
  index (ctx, done) {
    this.renderErrorView({ status: 404 }, done);
  }
}
