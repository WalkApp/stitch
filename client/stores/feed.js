import alt from '../alt';
import feedActions from '../actions/feed';


export default alt.createStore(class FeedStore {
  constructor () {
    this.bindActions(feedActions);
    this.news = [];
  }

  onPushNews (news) {
    let items = this.news.items.concat(news.items);
    this.news = news;
    this.news.items = items;
  }
});
