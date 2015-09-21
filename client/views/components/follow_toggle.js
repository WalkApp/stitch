import React from 'react';
import Component from '../../base/component';


export default class FollowToggle extends Component {
  initState () {
    return {
      // TODO: API integration
      isFollow: false,
    };
  }

  handleToggle () {
    // TODO: API integration
    let toggle = !this.state.isFollow;
    this.setState({isFollow: toggle});
  }

  render () {
    return <button className={this.cx('m-btn m-btn-block m-btn-sm m-btn-success', {'m-btn-active': this.state.isFollow})} onClick={this.handleToggle.bind(this)}>
      {this.state.isFollow ? this.lang.captions.unfollow : this.lang.captions.follow}
    </button>;
  }

}
