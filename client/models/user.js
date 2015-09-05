import Model from '../base/model';
import user from '../modules/user';


export default class UserModel extends Model {
  url () {
    var
      username = this.get('username'),
      url = this.baseUrl();

    if (username && username !== user.get('username')) {
      url += `/${username}`;
    }

    return url;
  }

  urlPath () {
    return '/user';
  }
}
