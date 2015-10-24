import React from 'react';
import _ from 'lodash';
import { removeFromArray } from 'libs/utils';
import Form from '../../base/form';
import AutoresizeTextarea from './autoresize_textarea';
import ImageUploader from './image_uploader';
import PostModel from '../../models/post';
import userPostsActions from '../../actions/user/posts';
import currentUser from '../../stores/current_user';


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
    dfd.always(this.unlockForm);
    dfd.then(() => {
      userPostsActions.unshiftItem(post.toJSON());
      this.refs.imgUploader.reset();
      this.refreshState();
    });
  }

  render () {
    var { active } = this.state;

    return <form className="m-panel c-quick_post" onSubmit={this.handleSubmit}>
      <ImageUploader ref="imgUploader" id="post-images" onDeleted={this.deleteImage.bind(this)} onAdded={this.addImage.bind(this)} onFree={this.unlockForm} onBusy={this.lockForm} />
      <div className="m-p-body c-qp-body">
        <div className="c-qp-left">
          <div className="c-qp-avatar" style={{ backgroundImage: `url(${currentUser.get('image_url')})` }}></div>
        </div>
        <div className="c-qp-main">
          <div className="c-qp-location_box">
            <input valueLink={this.linkState('model.address')} placeholder={this.lang.fields.location} className="m-control" type="text" required />
            <div className="c-qp-lb-pin">
              <i className="icon-pin"></i>
            </div>
          </div>
          <div className="c-qp-description">
            <AutoresizeTextarea valueLink={this.linkState('model.description')} placeholder={this.lang.messages.add_post} className="m-control" required />
          </div>
        </div>
      </div>
      <div className="c-qp-images">
        <div data-uploader-preview="post-images"></div>
      </div>
      <div className="c-qp-footer">
        <div className="c-qp-f-actions">
          <button type="button" className="m-btn m-btn-sm m-btn-light" data-uploader="post-images">
            <i className="icon-photo"></i>{this.lang.captions.attach_photo}
          </button>
        </div>
        <div className="c-qp-f-submit">
          <button type="submit" className="m-btn m-btn-sm m-btn-block" disaled={this.formLocked} type="submit">{this.lang.captions.add_post}</button>
        </div>
      </div>
    </form>;
  }
}
