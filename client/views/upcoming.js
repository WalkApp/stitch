import React from 'react';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import UserCard from './partials/user_card';
import userStore from '../stores/user';
import currentUser from '../stores/current_user';


export default class Upcoming extends Component {
  title () {
    let user = userStore.getState().user;
    return `${user.full_name || user.username} | ${this.lang.brand.name}`;
  }

  initState () {
    let { user, followerCount, followingCount } = userStore.getState();

    return {
      user,
      followerCount,
      followingCount,
      isOwner: user.username === currentUser.get('username'),
    };
  }

  componentDidMount () {
    userStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    userStore.unlisten(this.refreshState);
  }

  render () {
    let { user, isOwner } = this.state;

    return <div className="p-user l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="p-u-top">
          <div className="l-content">
            <div className="pure-g">
              <div className="pure-u-6-24"></div>
              <div className="pure-u-18-24">
                <div className="l-right-section">
                  <div className="m-nav-tabs">
                    <nav className="m-nt-tabs">
                      <a href={`/${user.username}`}>{this.lang.captions.posts}</a>
                      <a className="active">{this.lang.captions.upcoming}</a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="l-content">
          <div className="pure-g">
            <div className="pure-u-6-24 p-u-profile">
              <UserCard {...this.state} />
            </div>
            <div className="pure-u-18-24">
              <div className="l-right-section">
                <div className="m-empty_message">
                  <div className="m-em-icon">
                    <i className="icon-empty_events"></i>
                  </div>
                  <p className="m-em-message">
                    { isOwner ? 'You haven\'t any events yet.' : `${user.full_name || user.username} hasn't any events yet` }
                  </p>
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
