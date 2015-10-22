import Store from './store';


export default class CollectionStore extends Store {
  constructor () {
    super();
    this.collection = null;
  }

  onLoadMore (collection) {
    collection.items = this.collection.items.concat(collection.items);
    this.collection = collection;
  }

  onUnshiftItem (item) {
    this.collection.items.unshift(item);
  }
}
