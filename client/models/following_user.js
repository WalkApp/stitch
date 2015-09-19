import Model from '../base/model';


export default class FollowingUser extends Model {
  urlPath () {
    return `/users/profile/following`;
  }
}
