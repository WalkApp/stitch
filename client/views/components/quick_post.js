import React from 'react';
import _ from 'lodash';
import { removeFromArray } from 'libs/utils';
import Form from '../../base/form';
import ImageUploader from './image_uploader';
import PostModel from '../../models/post';
import userPostsActions from '../../actions/user/posts';


export default class QuickPost extends Form {
  initState () {
    return {
      active: false,
      model: {
        description: '',
        image_urls: [],
      },
    };
  }

  addImage (url) {
    this.state.model.image_urls.push(url);
    this.setState({ model: this.state.model });
  }

  deleteImage (url) {
    removeFromArray(this.state.model.image_urls, url);
    this.setState({ model: this.state.model });
  }

  save (model) {
    this.lockForm();
    let post = new PostModel(model, null, { params: { username: 'profile' } });

    let dfd = post.save();
    dfd.fail(xhr => this.handleAPIError(xhr));
    dfd.then(() => {
      userPostsActions.unshiftItem(post.toJSON());
      this.unlockForm();
      this.refreshState();
    });
  }

  render () {
    var { active } = this.state;

    return <form className="c-quick-post" onSubmit={this.handleSubmit}>
      {active
        ? <div>
            <div className="m-control-list">
              <textarea valueLink={this.linkState('model.description')} placeholder={this.lang.messages.add_post} className="m-control" required/>
              <input valueLink={this.linkState('model.address')} placeholder={this.lang.fields.address} type="text" className="m-control"/>
              <ImageUploader onDeleted={this.deleteImage.bind(this)} onAdded={this.addImage.bind(this)} onFree={this.unlockForm} onBusy={this.lockForm} action='https://api.cloudinary.com/v1_1/walk/image/upload'/>
            </div>
            <p className="l-text-right">
              <button className="m-btn" type="submit" disabled={this.state.formLocked}>{this.lang.captions.add_post}</button>
            </p>
          </div>
        : <div>
            <div className="m-control-list">
              <textarea valueLink={this.linkState('model.description')} className="m-control-static" onClick={() => this.setState({ active: true })} placeholder={this.lang.messages.add_post}/>
            </div>
          </div>
      }
    </form>;
  }
}
