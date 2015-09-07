import React from 'react';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';
import lang from '../lang';
import moment from 'moment';


export default class User extends Component {
  title () {
    return `${lang.brand.name}`;
  }

  render () {
    var { user } = this.props.data;

    return <div className="p-user l-layout">
      <Header />
      <div className="l-wrapper">
        <div className="l-container p-u-top">
          <div className="pure-g">
            <div className="pure-u-6-24"></div>
            <div className="pure-u-16-24">
              <nav className="p-u-tabs">
                <a className="active" href="/user">{lang.captions.posts}</a>
                <a href="/user/upcomming">{lang.captions.upcomming}</a>
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
                <ul className="m-p-statistics">
                  <li><strong>00</strong> <small>{lang.captions.followers}</small></li>
                  <li><strong>00</strong> <small>{lang.captions.following}</small></li>
                </ul>
              </div>
            </div>
            <div className="pure-u-16-24">
              <div className="p-u-content">
                <div className="m-wall">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }
}
