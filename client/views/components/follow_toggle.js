import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import FolloweeModel from '../../models/followee';
import lang from '../../lang';


const TOGGLE_LIMIT = 200;

export default class FollowToggle extends Component {

  constructor () {
    super();
    this.handleToggle = _.debounce(this.handleToggle.bind(this), TOGGLE_LIMIT);
  }

  componentDidMount () {
    let isFollowed = this.props.user.is_followed;
    this.setState({isFollowed});
  }

  handleToggle () {
    let followee = new FolloweeModel({_id: this.props.user.username});

    let dfd;
    if (this.state.isFollowed) {
      dfd = followee.destroy();
    } else {
      dfd = followee.save(null, {
        type: 'POST',
      });
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
