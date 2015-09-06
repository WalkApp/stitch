import Model from '../base/model';
import user from '../modules/user';


export default class UserModel extends Model {
  urlPath () {
    var
      urlPath = '/user',
      username = this.username;

    if (username && username !== user.get('username')) {
      urlPath += `/${username}`;
    }

    return urlPath;
  }
}
