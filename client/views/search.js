import React from 'react';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import SearchBox from './components/search_box';
import lang from '../lang';


export default class User extends Component {
  title () {
    return `${lang.titles.search}`;
  }

  render () {
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
            <li className="m-ul-item">
              <div className="m-ul-i-avatar">
                <a href="/user">
                  <div style={{ backgroundImage: 'url(/images/default_avatar.jpg)' }} className="m-ul-i-a-img"></div>
                </a>
              </div>
              <div className="m-ul-i-info">
                <a href="/user" className="m-ul-i-i-login">
                  atomiomi
                </a>
                <div className="m-ul-i-i-fullname">
                  | Ablay Keldibek
                </div>
                <div className="m-ul-i-i-location">
                  <i className="icon-pin"></i> Astana, Kazakhstan
                </div>
              </div>
              <div className="m-ul-i-actions">
                <button className="m-btn m-btn-success m-btn-block m-btn-small">
                  {lang.captions.follow}
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  }
}
