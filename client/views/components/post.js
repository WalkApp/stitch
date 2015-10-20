import React from 'react';
import Component from '../../base/component';


export default class Post extends Component {
  render () {
    let { post } = this.props.data;

    return <div className="c-post m-panel">
      {post.image_urls.length > 0
        ? <img className="c-p-image" src={post.image_urls[0]} />
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
