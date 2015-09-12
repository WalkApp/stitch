import Model from '../base/model';


export default class Event extends Model {
  urlPath () {
    return `/users/${this.username}/events`;
  }
}
