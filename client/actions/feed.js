import alt from '../alt';


class FeedActions {
  constructor () {
    this.generateActions('pushNews');
  }
}

export default alt.createActions(FeedActions);
