import alt from '../alt';


class FeedActions {
  constructor () {
    this.generateActions('loadMore');
  }
}

export default alt.createActions(FeedActions);
