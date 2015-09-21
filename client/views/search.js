import React from 'react';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import SearchBox from './components/search_box';
import FollowToggle from './components/follow_toggle.js';
import currentUser from '../modules/user';
import lang from '../lang';
import moment from 'moment';


export default class User extends Component {
  title () {
    return `${lang.titles.search}`;
  }

  render () {
    let { results } = this.props.data;

    return <div className="p-search l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="p-s-top">
          <div className="p-s-container">
            <SearchBox />
          </div>
        </div>
        <div className="p-s-container">
          <ul className="m-user-list">
            {results.length
              ? results.map((user, index) => {
                let isCurrentUser = user.username === currentUser.get('username');
                return <li key={index} className="m-ul-item">
                  <div className="m-ul-i-avatar">
                    <a href={`/user/${user.username}`}>
                      <div style={{ backgroundImage: `url(${user.image_url})` }} className="m-ul-i-a-img"></div>
                    </a>
                  </div>
                  <div className="m-ul-i-info">
                    <a href={`/user/${user.username}`} className="m-ul-i-i-login">
                      {user.username}
                    </a>
                    {user.full_name ? <div className="m-ul-i-i-fullname">| {user.full_name}</div> : false}
                    <div className="m-ul-i-i-joined">
                      <i className="icon-clock"></i>{moment(user.created).format('MMM DD, YYYY')}
                    </div>
                  </div>
                  <div className="m-ul-i-actions">
                    {isCurrentUser ? false : <FollowToggle user={user}/>}
                  </div>
                </li>;
              })
              : <h4>{lang.messages.no_records_found}</h4>}
          </ul>
        </div>
      </div>
      <Footer />
    </div>;
  }
}
