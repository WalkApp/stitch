import Controller from '../base/controller';
import user from '../../client/modules/user';


export default class AuthController extends Controller {
  login (req, res, next) {
    if (req.session.token) {
      return res.json({ sucess: true });
    }

    let { token } = req.body;
    let dfd = user.fetch({ token });

    dfd.done(() => {
      req.session.token = token;
      res.json({ sucess: true });
    });

    dfd.fail(() => {
      this.error('bad_token');
    });
  }

  logout (req, res, next) {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.json({ sucess: true });
    });
  }

  router () {
    this.post('/auth/login', this.login);
    this.get('/auth/logout', this.logout);
  }
}
