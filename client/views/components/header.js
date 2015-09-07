import React from 'react';
import Component from '../../base/component';
import Dropdown from './dropdown';
import HeaderSearchBox from './header_search_box';
import lang from '../../lang';
import vent from '../../modules/vent';
import user from '../../modules/user';


export default class Header extends Component {

  initState () {
    return { currentPath: '' };
  }

  componentWillMount () {
    vent.on('route:after', this.setActivePath, this);
  }

  componentWillUnmount () {
    vent.off('route:after', this.setActivePath, this);
  }

  setActivePath (ctx) {
    this.setState({ currentPath:ctx.pathname });
  }

  render () {
    return <div className="c-header">
      <div className="l-container">
        <div className="pure-g">
          <div className="pure-u-4-24">
            <a href="/user" className="m-logo m-logo-small">
              <h1 className="m-l-title">{lang.brand.name}</h1>
            </a>
          </div>
          <div className="pure-u-18-24">
            <ul className="c-h-menu">
              <li className={this.cx({'active': this.state.currentPath === `/user/${user.get('username')}` })}>
                <a href="/user">
                  <span className="icon-home"></span>
                  <span className="c-h-m-underline"></span>
                </a>
              </li>
              <li className={this.cx({'active': this.state.currentPath === '/feed' })}>
                <a href="/feed">
                  <span className="icon-newspaper"></span>
                  <span className="c-h-m-underline"></span>
                </a>
              </li>
              <li>
                <HeaderSearchBox />
              </li>
            </ul>
          </div>
          <div className="pure-u-2-24">
            <div className="c-h-avatar">
              <span className="c-h-a-img" data-dropdown-toggle="account-dropdown" style={{ backgroundImage: 'url(/images/default_avatar.jpg)' }}></span>
              <Dropdown id="account-dropdown">
                <ul className="c-d-menu">
                  <li><a href="/profile">{lang.captions.profile}</a></li>
                  <li><a href="/settings">{lang.captions.settings}</a></li>
                  <div className="c-d-footer">
                    <li><span>{lang.captions.log_out}</span></li>
                  </div>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
