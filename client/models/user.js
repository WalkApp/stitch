import Model from '../base/model';


export default class UserModel extends Model {
  urlPath () {
    return '/users';
  }

  url () {
    let url = this.baseUrl();

    if (this.username) {
      url += `/${this.username}`;
    }

    return url;
  }
}
