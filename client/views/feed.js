import React from 'react';
import FeedCollection from '../models/feed';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import Post from './components/post';
import LoadMore from './components/load_more';
import feedActions from '../actions/feed';
import feedStore from '../stores/feed';


export default class Feed extends Component {
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

  render () {
    let { collection } = this.state;

    return <div className="p-feed l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="l-content">
          <div className="pure-g">
            <div className="pure-u-3-24"></div>
            <div className="pure-u-18-24">
              <h2 className="p-f-title">{this.lang.captions.feed}</h2>
              <div className="m-wall">
                {collection.items.map((post, index) => {
                  return <div key={index} className="m-w-row">
                    <Post data={{ post }}/>
                  </div>;
                })}
                <LoadMore Collection={FeedCollection} data={collection} onLoad={data => feedActions.loadMore(data)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
  }
}
