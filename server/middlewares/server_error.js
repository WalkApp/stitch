import Controller from 'client/base/controller';


class ServerErrorController extends Controller {
  index () {
    this.renderErrorView({ status: 500 });
  }
}

export default function (req, res, next) {
  let ctor = new ServerErrorController();

  ctor.req = req;
  ctor.res = res;

  ctor.index();
};
