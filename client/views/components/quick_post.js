import React from 'react';
import _ from 'lodash';
import Form from '../../base/form';
import PostModel from '../../models/post';
import userActions from '../../actions/user';
import ImageUploader from './image_uploader';

let post = new PostModel();

export default class QuickPost extends Form {
  initState () {
    return {
      active: false,
      model: {description: ''},
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
    debugger;
    if (!url) throw new Error('Argument exception: url');

    let urls = post.get('image_urls');
    urls.push(url);

    post.set('image_urls', urls);
  }

  deleteImage (url) {
    if (!url) throw new Error('Argument exception: url');

    let urls = post.get('image_urls');
    urls.splice(urls.indexOf(url), 1);

    post.set('image_urls', urls);
  }

  save (model) {
    post.set(model);
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
