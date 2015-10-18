import React from 'react';
import Feed from '../models/feed';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import Post from './components/post';
import feedActions from '../actions/feed';
import feedStore from '../stores/feed';


export default class User extends Component {
  title () {
    return `${this.lang.brand.name}`;
  }

  initState () {
    return feedStore.getState();
  }

  componentDidMount () {
    feedStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    feedStore.unlisten(this.refreshState);
  }

  loadMore () {
    let { filter, pagination } = this.state.news;
    let feed = new Feed(null, { filter, pagination });
    feed.pagination.page += 1;

    let dfd = feed.fetch();
    dfd.done(() => {
      feedActions.pushNews(feed.toJSON());
    });
  }

  render () {
    let { news } = this.state;

    return <div className="p-feed l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="l-content">
          <div className="pure-g">
            <div className="pure-u-3-24"></div>
            <div className="pure-u-18-24">
              <h2 className="p-f-title">Recent News</h2>
              <div className="m-wall">
                {news.items.map((post, index) => {
                  return <div key={index} className="m-w-row">
                    <Post data={{ post }}/>
                  </div>;
                })}
                {news.canLoadMore
                  ? <button className="m-btn m-btn-load-more" onClick={this.loadMore.bind(this)}>
                      {this.lang.captions.load_more}
                    </button>
                  : false
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
  }
}
