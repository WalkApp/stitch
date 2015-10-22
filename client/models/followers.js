import Collection from '../base/collection';


export default class Followers extends Collection {
  urlPath () {
    return `/users/${this.params.username}/followers`;
  }
}
