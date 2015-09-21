import React from 'react';
import moment from 'moment';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import Post from './components/post';
import QuickPost from './components/quick_post';
import FollowToggle from './components/follow_toggle';
import userStore from '../stores/user';


export default class User extends Component {
  title () {
    return `${this.lang.brand.name}`;
  }

  initState () {
    return userStore.getState();
  }

  componentDidMount () {
    userStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    userStore.unlisten(this.refreshState);
  }

  render () {
    let { user, posts, isOwner } = this.state;

    return <div className="p-user l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="l-container p-u-top">
          <div className="pure-g">
            <div className="pure-u-6-24"></div>
            <div className="pure-u-16-24">
              <nav className="p-u-tabs">
                <a className="active" href={`/user/${user.username}`}>{this.lang.captions.posts}</a>
                <a href={`/user/${user.username}/upcoming`}>{this.lang.captions.upcoming}</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="p-u-line"></div>
        <div className="l-container p-u-body">
          <div className="pure-g">
            <div className="pure-u-6-24">
              <div className="m-profile">
                <div className="m-p-avatar" style={{ backgroundImage: `url(${user.image_url})` }}></div>
                { user.full_name ? <div className="m-p-fullname">{user.full_name}</div> : false }
                <div className="m-p-username">{user.username}</div>
                <ul className="m-p-info">
                  <li><i className="icon-clock"></i>{moment(user.created).format('MMM DD, YYYY')}</li>
                </ul>
                {!isOwner
                  ? <div className="m-p-follow">
                      <FollowToggle />
                    </div>
                  : false
                }
                <ul className="m-p-statistics">
                  <li><strong>00</strong>
                    <small>{this.lang.captions.followers}</small>
                  </li>
                  <li><strong>00</strong>
                    <small>{this.lang.captions.following}</small>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pure-u-16-24">
              <div className="p-u-content">
                {isOwner ? <QuickPost /> : false}
                <div className="m-wall">
                  {posts.map((post, index) => {
                    return <div key={index} className="m-w-row">
                      <Post data={{ post }}/>
                    </div>;
                  })}
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
