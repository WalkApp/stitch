import page from 'page';
import user from '../modules/user';


export default function auth (ctx, next) {
  if (!user.authorized()) {
    return page.redirect('/signin');
  }

  next();
};
