import page from 'page';
import user from '../modules/user';
import _ from 'lodash';

export default function (ctx, next) {
  var forbiddenForAccessUrls = ['/welcome', '/signup', '/signin'];

  if (user.authorized() && _.includes(forbiddenForAccessUrls, ctx.pathname)) {
    return page.redirect('/user');
  }
    next();
};