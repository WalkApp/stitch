import Collection from '../base/collection';


export default class EventsCollection extends Collection {
  urlPath () {
    return `/users/${this.username}/events`;
  }
}
