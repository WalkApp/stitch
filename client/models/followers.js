import Collection from '../base/collection';


export default class Followers extends Collection {
  urlPath () {
    return '/users/profile/followers';
  }
}
