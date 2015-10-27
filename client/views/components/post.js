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
      <div className="c-p-info m-p-body">
        <div className="c-p-i-icon">
          <i className="icon-pin"></i>
        </div>
        <div className="c-p-i-address">{post.address}</div>
      </div>
      <div className="c-p-description">
        <p>
          {post.description}
        </p>
      </div>
      <div className="c-p-footer">
        <div className="c-p-f-likes">
          <i className="icon-pin"></i>
          <strong className="c-p-f-l-count">12</strong>
        </div>
        <div className="c-p-f-actions">
          <button type="button" className="m-btn m-btn-sm m-btn-light" data-uploader="post-images">
            <i className="icon-upcoming"></i>{this.lang.captions.add_event}
          </button>
        </div>

      </div>
    </div>;
  }
}
