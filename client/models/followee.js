import Model from '../base/model';


export default class Followee extends Model {
  urlPath () {
    return `/users/profile/following`;
  }
}
