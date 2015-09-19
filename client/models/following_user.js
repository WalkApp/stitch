import Model from '../base/model';


export default class FollowingUser extends Model {
  urlPath () {
    return `/users/${this.username}/following`;
  }

  url () {
    let url = this.baseUrl();

    if (this.followeeUsername) {
      url += `/${this.followeeUsername}`;
    }

    return url;
  }
}
