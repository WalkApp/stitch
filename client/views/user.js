import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import PostsCollection from '../models/posts';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import Post from './components/post';
import QuickPost from './components/quick_post';
import FollowToggle from './components/follow_toggle';
import LoadMore from './components/load_more';
import userStore from '../stores/user';
import userPostsStore from '../stores/user/posts';
import currentUser from '../stores/current_user';
import userPostsActions from '../actions/user/posts';


export default class User extends Component {
  title () {
    return `${this.lang.brand.name}`;
  }

  initState () {
    let { user, followerCount, followingCount } = userStore.getState();
    let { collection } = userPostsStore.getState();

    return {
      user,
      followerCount,
      followingCount,
      isOwner: user.username === currentUser.get('username'),
      posts: collection,
    };
  }

  componentDidMount () {
    userStore.listen(this.refreshState);
    userPostsStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    userStore.unlisten(this.refreshState);
    userPostsStore.unlisten(this.refreshState);
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
                  <li>
                    <strong>{_.padLeft(followerCount, '2', '0')}</strong>
                    <small>{this.lang.captions.followers}</small>
                  </li>
                  <li>
                    <strong>{_.padLeft(followingCount, '2', '0')}</strong>
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
                      <Post data={{ post }} />
                    </div>;
                  })}
                  <LoadMore Collection={PostsCollection} data={posts} onLoad={data => userPostsActions.loadMore(data)} />
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
