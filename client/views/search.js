import React from 'react';
import moment from 'moment';
import UsersCollection from '../models/users';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import SearchBox from './components/search_box';
import FollowToggle from './components/follow_toggle';
import LoadMore from './components/load_more';
import currentUser from '../stores/current_user';
import searchUsersStore from '../stores/search/users';
import searchUsersActions from '../actions/search/users';


export default class Search extends Component {
  title () {
    return `${this.lang.titles.search}`;
  }

  initState () {
    return searchUsersStore.getState();
  }

  componentDidMount () {
    searchUsersStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    searchUsersStore.unlisten(this.refreshState);
  }

  render () {
    let { collection } = this.state;

    return <div className="p-search l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="p-s-top">
          <div className="l-container">
            <SearchBox />
          </div>
        </div>
        <div className="l-content">
          {collection.items.length
            ? <ul className="m-user-list">
                {collection.items.map((user, index) => {
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
                <LoadMore Collection={UsersCollection} data={collection} onLoad={data => searchUsersActions.loadMore(data)} />
              </ul>
            : <div className="m-empty_message">
                <div className="m-em-icon">
                  <i className="icon-search"></i>
                </div>
                <p className="m-em-message">
                  {this.lang.messages.no_records_found}
                </p>
              </div>
          }
        </div>
      </div>
      <Footer />
    </div>;
  }
}
