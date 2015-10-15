import React from 'react';
import moment from 'moment';
import PostsCollection from '../models/posts';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import Post from './components/post';
import QuickPost from './components/quick_post';
import FollowToggle from './components/follow_toggle';
import userStore from '../stores/user';
import currentUser from '../stores/current_user';
import userActions from '../actions/user';
import _ from 'lodash';


export default class User extends Component {
  title () {
    return `${this.lang.brand.name}`;
  }

  initState () {
    let state = userStore.getState();
    state.isOwner = state.user.username === currentUser.get('username');

    return state;
  }

  componentDidMount () {
    userStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    userStore.unlisten(this.refreshState);
  }

  loadMore () {
    let { filter, pagination } = this.state.posts;
    let posts = new PostsCollection(null, { filter, pagination });
    posts.pagination.page += 1;
    posts.username = this.state.user.username;

    let dfd = posts.fetch();
    dfd.done(() => {
      userActions.pushPosts(posts.toJSON());
    });
  }

  render () {
    let { user, posts, followerCount, followingCount, isOwner } = this.state;

    return <div className="p-user l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="l-content">
          <div className="pure-g">
            <div className="pure-u-6-24">
              <div className="m-profile">
                <div className="m-p-avatar" style={{ backgroundImage: `url(${user.image_url})` }}></div>
                { user.full_name ? <div className="m-p-fullname">{user.full_name}</div> : false }
                <div className="m-p-username">{user.username}</div>
                <ul className="m-p-info">
                  <li><i className="icon-clock"></i>{this.lang.messages.joined} {moment(user.created).format('MMM DD, YYYY')}</li>
                </ul>
                {!isOwner
                  ? <div className="m-p-follow">
                      <FollowToggle user={user} />
                    </div>
                  : false
                }
                <ul className="m-p-statistics">
                  <li><strong>{_.padLeft(followerCount, '2', '0')}</strong>
                    <small>{this.lang.captions.followers}</small>
                  </li>
                  <li><strong>{_.padLeft(followingCount, '2', '0')}</strong>
                    <small>{this.lang.captions.following}</small>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pure-u-18-24">
              <div className="l-right-section">
                <div className="m-nav-tabs">
                  <nav className="m-nt-tabs">
                    <a className="active">{this.lang.captions.posts}</a>
                    <a href={`/${user.username}?section=upcoming`}>{this.lang.captions.upcoming}</a>
                  </nav>
                </div>
                {isOwner ? <QuickPost /> : false}
                <div className="m-wall">
                  {posts.items.map((post, index) => {
                    return <div key={index} className="m-w-row">
                      <Post data={{ post }}/>
                    </div>;
                  })}
                  {posts.canLoadMore
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
      </div>
      <Footer />
    </div>;
  }
}
