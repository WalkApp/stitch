import page from 'page';
import user from '../modules/user';

export default function (ctx, next) {

  if (user.authorized()) {
    return page.redirect('/user');
  }

  next();
};