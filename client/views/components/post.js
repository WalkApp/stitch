import React from 'react';
import Component from '../../base/component';


export default class Post extends Component {
  render () {
    var { post } = this.props.data;

    return <div className="c-post m-panel">
      {post.image_url
        ? <img className="c-p-image" src={post.image_url} />
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
    </div>
  }
}
