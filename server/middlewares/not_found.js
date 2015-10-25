import Controller from 'client/base/controller';


class NotFoundController extends Controller {
  index () {
    this.renderErrorView({ status: 404 });
  }
}

export default function (req, res, next) {
  let ctor = new NotFoundController();

  ctor.req = req;
  ctor.res = res;

  ctor.index();
};
