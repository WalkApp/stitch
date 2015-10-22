import Model from '../base/model';


export default class Post extends Model {
  urlPath () {
    return `/users/${this.params.username}/posts`;
  }
}
