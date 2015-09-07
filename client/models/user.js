import Model from '../base/model';
import user from '../modules/user';


export default class UserModel extends Model {
  urlPath () {
    var urlPath = '/users';

    if (this.username) {
      urlPath += `/${this.username}`;
    }

    return urlPath;
  }
}
