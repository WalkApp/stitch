import React from 'react';
import _ from 'lodash';
import Form from '../../base/form';
import PostModel from '../../models/post';
import userActions from '../../actions/user';
import ImageUploader from './image_uploader';
import vent from '../../modules/vent';


export default class QuickPost extends Form {
  initState () {
    return {
      active: false,
      model: {description: ''},
      postImages: [],
      disabled: false,
    };
  }

  componentWillMount () {
    vent.on('imageUploader:deleted', this.deleteImage, this);
    vent.on('imageUploader:added', this.addImage, this);
    vent.on('imageUploader:free', this.enableSaving, this);
    vent.on('imageUploader:busy', this.disableSaving, this);
  }

  componentWillUnmount () {
    vent.off('imageUploader:deleted');
    vent.off('imageUploader:added');
    vent.off('imageUploader:free');
    vent.off('imageUploader:busy');
  }

  disableSaving () {
    this.setState({disabled: true});
  }

  enableSaving () {
    this.setState({disabled: false});
  }

  addImage (file) {
    if (!file) throw new Error('Argument exception: file');

    let images = this.state.postImages;
    images.push(file);

    this.setState({postImages: images});
  }

  deleteImage (file) {
    if (!file) throw new Error('Argument exception: file');

    let images = this.state.postImages;

    if (images && images.length > 0) {
      _.forEach(images, (image, i) => {
        if (images[i].name === file.name && images[i].size === file.size) {
          images.splice(i, 1);
        }
      });

      this.setState({postImages: images});
    }
  }

  save (model) {
    let post = new PostModel(model);

    post.username = 'profile';
    post.set('image_urls', _.pluck(this.state.postImages, 'url'));

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
          <textarea valueLink={this.linkState('model.description')} placeholder={this.lang.messages.add_post}
                    className="m-control" required/>
          <input valueLink={this.linkState('model.address')} placeholder={this.lang.fields.address} type="text"
                 className="m-control"/>
          <ImageUploader action='https://api.cloudinary.com/v1_1/walk/image/upload'/>
        </div>
        <p className="l-text-right">
          <button className="m-btn" type="submit" disabled={this.state.disabled}>{this.lang.captions.add_post}</button>
        </p>
      </div>
        : <div>
        <div className="m-control-list">
          <textarea valueLink={this.linkState('model.description')} className="m-control-static"
                    onClick={() => this.setState({ active: true })} placeholder={this.lang.messages.add_post}/>
        </div>
      </div>
      }
    </form>;
  }
}
