import React from 'react';
import Component from '../../base/component';
import Dropdown from './dropdown';
import HeaderSearchBox from './header_search_box';
import lang from '../../lang';


export default class Header extends Component {
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
              <li>
                <a href="/user">
                  <span className="icon-home"></span>
                  <span className="c-h-m-underline"></span>
                </a>
              </li>
              <li>
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
