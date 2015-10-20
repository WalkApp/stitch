import React from 'react';
import _ from 'lodash';
import Component from '../../base/component';


export default class ImageUploader extends Component {
  /**
   * Configuration of Dropzone.js.
   * For a full list of possible configurations,
   * please consult
   * http://www.dropzonejs.com/#configuration
   */
  getDzConfig () {
    return {
      addRemoveLinks: true,
      acceptedFiles: 'image/*',
    };
  }

  componentDidMount () {
    if (!Dropzone) return;

    let options = this.getDzConfig();

    this.dropzone = new Dropzone(React.findDOMNode(this), options);
    this.setupEvents();
  }

  componentWillUnmount () {
    if (this.dropzone) {
      this.dropzone = this.dropzone.destroy();
    }
  }

  render () {
    let className = this.cx('dropzone', {[this.props.className]: this.props.className});

    if (!this.props.action) throw new Error('No action property');

    return <form action={this.props.action} className={className}>
      {this.props.children}
    </form>;
  }

  setupEvents () {
    if (!this.dropzone) {
      return;
    }

    this.dropzone.on('success', (file, resp) => {
      this.trigger('added', resp.url);
    });

    this.dropzone.on('sending', (file, xhr, formData) => {
      formData.append('upload_preset', 'nh0kmjdj');
      this.trigger('busy');
    });

    this.dropzone.on('removedfile', (file) => {
      if (!file.xhr) throw new Error('xhr object cannot be undefined');

      let url = JSON.parse(file.xhr.response).url;
      this.trigger('deleted', url);
    });

    this.dropzone.on('complete', () => {
      this.trigger('free');
    });
  }

}
