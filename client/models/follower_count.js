import Model from '../base/model';


export default class FollowerCount extends Model {
  urlPath () {
    return '/users/profile/followers/count';
  }
}
