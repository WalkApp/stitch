import React from 'react';
import moment from 'moment';
import UsersCollection from '../models/users';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import SearchBox from './components/search_box';
import FollowToggle from './components/follow_toggle.js';
import currentUser from '../stores/current_user';
import searchStore from '../stores/search';
import searchActions from '../actions/search';


export default class User extends Component {
  title () {
    return `${this.lang.titles.search}`;
  }

  initState () {
    return searchStore.getState();
  }

  componentDidMount () {
    searchStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    searchStore.unlisten(this.refreshState);
  }

  loadMore () {
    let { filter, pagination } = this.state.users;
    let users = new UsersCollection(null, { filter, pagination });
    users.pagination.page += 1;

    let dfd = users.fetch();
    dfd.done(() => {
      searchActions.pushUsers(users.toJSON());
    });
  }

  render () {
    let { users } = this.state;

    return <div className="p-search l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="p-s-top">
          <div className="l-container">
            <SearchBox />
          </div>
        </div>
        <div className="l-container">
          {users.items.length
            ? <ul className="m-user-list">
                {users.items.map((user, index) => {
                  let isCurrentUser = user.username === currentUser.get('username');
                  let userUrl = `/${user.username}`;

                  return <li key={index} className="m-ul-item">
                    <div className="m-ul-i-avatar">
                      <a href={userUrl}>
                        <div style={{ backgroundImage: `url(${user.image_url})` }} className="m-ul-i-a-img"></div>
                      </a>
                    </div>
                    <div className="m-ul-i-info">
                      <a href={userUrl} className="m-ul-i-i-login">
                        {user.username}
                      </a>
                      {user.full_name ? <div className="m-ul-i-i-fullname">| {user.full_name}</div> : false}
                      <div className="m-ul-i-i-joined">
                        <i className="icon-clock"></i>{this.lang.messages.joined} {moment(user.created).format('MMM DD, YYYY')}
                      </div>
                    </div>
                    <div className="m-ul-i-actions">
                      {isCurrentUser ? false : <FollowToggle user={user}/>}
                    </div>
                  </li>;
                })}
                {users.canLoadMore
                  ? <button className="m-btn m-btn-load-more" onClick={this.loadMore.bind(this)}>
                      {this.lang.captions.load_more}
                    </button>
                  : false
                }
              </ul>
            : <h4>{this.lang.messages.no_records_found}</h4>
          }
        </div>
      </div>
      <Footer />
    </div>;
  }
}
