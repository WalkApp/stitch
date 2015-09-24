import alt from '../alt';


class SearchActions {
  constructor () {
    this.generateActions('pushUsers');
  }
}

export default alt.createActions(SearchActions);
