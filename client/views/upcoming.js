import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import EventsCollection from '../models/events';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import Event from './components/event';
import QuickEvent from './components/quick_event';
import FollowToggle from './components/follow_toggle';
import userStore from '../stores/user';
import userActions from '../actions/user';
import currentUser from '../stores/current_user';


export default class Upcoming extends Component {
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
    let { filter, pagination } = this.state.events;
    let events = new EventsCollection(null, { filter, pagination });
    events.pagination.page += 1;
    events.username = this.state.user.username;

    let dfd = events.fetch();
    dfd.done(() => {
      userActions.pushEvents(events.toJSON());
    });
  }

  render () {
    let { user, events, followerCount, followingCount, isOwner } = this.state;

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
              <div className="l-right">
                <div className="m-nav-tabs">
                  <nav className="m-nt-tabs">
                    <a href={`/user/${user.username}`}>{this.lang.captions.posts}</a>
                    <a className="active" href={`/user/${user.username}/upcoming`}>{this.lang.captions.upcoming}</a>
                  </nav>
                </div>
                {isOwner ? <QuickEvent /> : false}
                <div className="m-wall">
                  {events.items.map((event, index) => {
                    return <div key={index} className="m-w-row">
                      <Event data={{ event }}/>
                    </div>;
                  })}
                  {events.canLoadMore
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
