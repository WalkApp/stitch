import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Component from '../../base/component';
import FollowToggle from '../components/follow_toggle';


export default class UserCard extends Component {
  render () {
    let { user, followerCount, followingCount, isOwner } = this.props;

    return <div className="m-profile">
      <div className="m-p-avatar" style={{ backgroundImage: `url(${user.image_url})` }}></div>
      { user.full_name ? <div className="m-p-fullname">{user.full_name}</div> : false }
      <div className="m-p-username">{user.username}</div>
      <ul className="m-p-info">
        <li><i className="icon-clock"></i>{this.lang.messages.joined} {moment(user.created).format('MMM DD, YYYY')}</li>
      </ul>
      {!isOwner
        ? <div className="m-p-follow">
            <FollowToggle user={user} />
          </div>
        : false
      }
      <ul className="m-p-statistics">
        <li>
          <strong>{_.padLeft(followerCount, '2', '0')}</strong>
          <small>{this.lang.captions.followers}</small>
        </li>
        <li>
          <strong>{_.padLeft(followingCount, '2', '0')}</strong>
          <small>{this.lang.captions.following}</small>
        </li>
      </ul>
    </div>
  }
}
