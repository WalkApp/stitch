import React from 'react';
import Component from '../../base/component';
import lang from '../../lang';
export default class FollowToggle extends Component
{
  initState () {
    return {
      isFollow: false // TODO: API integration
    };
  }

  handleToggle () {
    // TODO: API integration
    var toggle = !this.state.isFollow;
    this.setState({isFollow: toggle});
  }

  render () {
    return <button className={this.cx('m-btn m-btn-block m-btn-sm m-btn-success', {'m-btn-active': this.state.isFollow})} onClick={this.handleToggle.bind(this)}>
      {lang.captions.follow}
    </button>
  }

}