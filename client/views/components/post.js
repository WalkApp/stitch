import React from 'react';
import moment from 'moment'
import Component from '../../base/component';
import currentUser from '../../stores/current_user';


export default class Post extends Component {
  render () {
    let { post } = this.props.data;
    let hasImage = post.image_urls && post.image_urls.length > 0;

    return <div className="c-post m-panel">
      <div className="c-p-header m-p-body">
        <div className="c-p-h-left">
          <div className="c-p-h-l-avatar" style={{ backgroundImage: `url(${currentUser.get('image_url')})` }}></div>
          <div className="c-p-h-l-info">
            <div className="c-p-h-l-i-author">{currentUser.get('username')}</div>
            <div className="c-p-h-l-i-time">{moment(post.created).fromNow()}</div>
          </div>

        </div>
        <div className="c-p-h-right"><i className="icon-clock"></i></div>
      </div>
      {hasImage
        ? <div className="m-p-body"><img className="c-p-image" src={post.image_urls[0]} /></div>
        : false
      }
      <div className="c-p-info m-p-note">
        <i className="icon-pin"></i> {post.address}
      </div>
      <div className="m-p-body">
        <p>
          {post.description}
        </p>
      </div>
    </div>;
  }
}
