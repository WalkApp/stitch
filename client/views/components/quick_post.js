import React from 'react';
import _ from 'lodash';
import { removeFromArray } from 'libs/utils';
import Form from '../../base/form';
import PostModel from '../../models/post';
import userActions from '../../actions/user';
import ImageUploader from './image_uploader';


export default class QuickPost extends Form {
  initState () {
    return {
      active: false,
      model: {
        description: '',
        image_urls: [],
      },
      disabled: false,
    };
  }

  disableSaving () {
    this.setState({disabled: true});
  }

  enableSaving () {
    this.setState({disabled: false});
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
    let post = new PostModel(model);
    post.username = 'profile';

    let dfd = post.save();
    dfd.fail((xhr) => this.handleAPIError(xhr));
    dfd.done(() => {
      userActions.addPost(post.toJSON());
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
              <ImageUploader onDeleted={this.deleteImage.bind(this)} onAdded={this.addImage.bind(this)} onFree={this.enableSaving.bind(this)} onBusy={this.disableSaving.bind(this)} action='https://api.cloudinary.com/v1_1/walk/image/upload'/>
            </div>
            <p className="l-text-right">
              <button className="m-btn" type="submit" disabled={this.state.disabled}>{this.lang.captions.add_post}</button>
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
