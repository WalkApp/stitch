import React from 'react';
import Component from '../../base/component';
import FollowingUser from '../../models/following_user';
import lang from '../../lang';
import _ from 'lodash';


const TOGGLE_LIMIT = 200;

export default class FollowToggle extends Component {

  constructor () {
    super();
    this.handleToggle = _.debounce(this.handleToggle.bind(this), TOGGLE_LIMIT);
  }

  initState () {
    return {
      isFollowed: false,
    };
  }

  handleToggle () {
    let followingUser = new FollowingUser({ _id: this.props.user.username });

    followingUser.followeeUsername = this.props.user.username;
    debugger;
    let dfd;
    if (this.state.isFollowed) {
      dfd = followingUser.destroy({isNew:false});
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
      className={this.cx('m-btn m-btn-block m-btn-sm m-btn-success', {'m-btn-active': this.state.isFollowed})}
      onClick={this.handleToggle.bind(this)}>
      {this.state.isFollowed ? lang.captions.unfollow : lang.captions.follow}
    </button>;
  }

}
