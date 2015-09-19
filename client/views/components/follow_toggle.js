import React from 'react';
import Component from '../../base/component';
import FollowingUser from '../../models/followingUser';
import lang from '../../lang';
import currentUser from '../../modules/user.js';


export default class FollowToggle extends Component {
  initState () {
    return {
      isFollowed: this.props.user.isFollowed,
    };
  }

  handleToggle () {
    let followingUser = new FollowingUser();

    followingUser.username = currentUser.get('username');
    followingUser.followeeUsername = this.props.user.username;

    let dfd;
    if (this.state.isFollowed) {
      dfd = followingUser.destroy();
    } else {
      dfd = followingUser.save();
    }

    dfd.done(() => {
      let toggle = !this.state.isFollowed;
      this.setState({isFollowed: toggle});
    });

  }

  render () {
    return <button
      className={this.cx('m-btn m-btn-block m-btn-sm m-btn-success', {'m-btn-active': this.state.isFollow})}
      onClick={this.handleToggle.bind(this)}>
      {this.state.isFollow ? lang.captions.unfollow : lang.captions.follow}
    </button>;
  }

}
