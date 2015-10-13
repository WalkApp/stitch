import React from 'react';
import Form from '../../base/form';
import PostModel from '../../models/post';
import userActions from '../../actions/user';
import Dropzone from '../components/file_uploader.js';

let componentConfig = {
  allowedFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: false,
  postUrl: 'https://api.cloudinary.com/v1_1/walk/image/upload'
};

let eventHandlers = {
  addedfile: simpleCallBack,
  sending: sendingCallback
};


let djsConfig = {
  addRemoveLinks: true
};

var sendingCallback = function (file, xhr, formData) {
  formData.append('upload_preset', 'nh0kmjdj');
  debugger;
  xhr.setRequestHeader('upload_preset', 'nh0kmjdj' );

};

var simpleCallBack = function (f) {
  console.log('I\'m a simple callback');
  console.log(f);
};

export default class QuickPost extends Form {
  initState () {
    return {
      active: false,
      model: { description: '' },
    };
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
              <textarea valueLink={this.linkState('model.description')} placeholder={this.lang.messages.add_post} className="m-control" required />
              <input valueLink={this.linkState('model.address')} placeholder={this.lang.fields.address} type="text" className="m-control" />
              <input valueLink={this.linkState('model.image_url')} placeholder={this.lang.fields.image_url} type="text" className="m-control" />
              <Dropzone config={componentConfig}  eventHandlers={eventHandlers}
                        djsConfig={djsConfig}  />
            </div>
            <p className="l-text-right">
              <button className="m-btn" type="submit">{this.lang.captions.add_post}</button>
            </p>
          </div>
        : <div>
            <div className="m-control-list">
              <textarea valueLink={this.linkState('model.description')} className="m-control-static" onClick={() => this.setState({ active: true })} placeholder={this.lang.messages.add_post} />
            </div>
          </div>
      }
    </form>;
  }
}
