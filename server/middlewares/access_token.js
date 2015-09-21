import user from '../../client/modules/user';
import error from './error';


export default function (req, res, next) {
  if (!req.session.token) {
    return next();
  } else {
    let dfd = user.fetch({ token: req.session.token });

    dfd.done(() => {
      req.user = user.toJSON();
      req.user.token = req.session.token;
      req.authorized = true;
      next();
    });

    dfd.fail(() => {
      error('bad_token');
    });
  }
}
