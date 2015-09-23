import React from 'react';
import Component from '../../base/component';
import Dropdown from './dropdown';
import HeaderSearchBox from './header_search_box';
import vent from '../../modules/vent';
import currentUser from '../../stores/current_user';
import auth from '../../modules/auth';


export default class Header extends Component {

  initState () {
    return {currentPath: ''};
  }

  componentWillMount () {
    vent.on('route:after', this.setActivePath, this);
  }

  componentWillUnmount () {
    vent.off('route:after', this.setActivePath, this);
  }

  setActivePath (ctx) {
    this.setState({currentPath: ctx.pathname});
  }

  signout () {
    auth.signout();
  }

  render () {
    return <div className="c-header">
      <div className="l-container">
        <div className="c-h-brand">
          <a href="/user" className="m-logo m-logo-small">
            <h1 className="m-l-title">{this.lang.brand.name}</h1>
          </a>
        </div>
        <ul className="c-h-nav">
          <li className={this.cx({active: this.state.currentPath === `/user/${currentUser.get('username')}` })}>
            <a href="/user">
              <span className="icon-home"></span>
            </a>
            <span className="c-h-n-underline"></span>
          </li>
          <li className={this.cx({active: this.state.currentPath === `/user/${currentUser.get('username')}/upcoming` })}>
            <a href={`/user/${currentUser.get('username')}/upcoming`}>
              <span className="icon-upcoming"></span>
            </a>
            <span className="c-h-n-underline"></span>
          </li>
          <li className={this.cx({active: this.state.currentPath === '/feed' })}>
            <a href="/feed">
              <span className="icon-newspaper"></span>
            </a>
            <span className="c-h-n-underline"></span>
          </li>
        </ul>
        <HeaderSearchBox />
        <div className="c-h-nav-right">
          <div className="c-h-nr-avatar">
            <span className="c-h-nr-a-img" data-dropdown-toggle="account-dropdown" style={{ backgroundImage: `url(${currentUser.get('image_url')})` }}></span>
            <Dropdown id="account-dropdown">
              <ul className="c-d-menu">
                <li><a href="/profile">{this.lang.captions.profile}</a></li>
                <li><a href="/settings">{this.lang.captions.settings}</a></li>
                <div className="c-d-footer">
                  <li><span onClick={this.signout}>{this.lang.captions.log_out}</span></li>
                </div>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>;
  }
}
