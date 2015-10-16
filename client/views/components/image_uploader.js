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
    let options = this.getDzConfig();

    if (!Dropzone) return;

    this.dropzone = new Dropzone(React.findDOMNode(this), options);
    this.setupEvents();
  }

  componentWillUnmount () {
    if (this.dropzone) {
      let files = this.dropzone.getActiveFiles();

      if (files.length > 0) {
        // Well, seems like we still have stuff uploading.
        // This is dirty, but let's keep trying to get rid
        // of the dropzone until we're done here.
        this.queueDestroy = true;

        let destroyInterval = setInterval(() => {
          if (this.queueDestroy = false) {
            return clearInterval(destroyInterval);
          }

          if (this.dropzone.getActiveFiles().length === 0) {
            this.dropzone = this.dropzone.destroy();
            return clearInterval(destroyInterval);
          }
        }, 500);
      } else {
        this.dropzone = this.dropzone.destroy();
      }
    }
  }

  render () {
    let className = this.cx('dropzone', { [this.props.className]: this.props.className });

    if (!this.props.action) throw new Error('No action property');

    return (
      <form action={this.props.action} className={className}>
        {this.props.children}
      </form>
    );
  }

  setupEvents () {
    if (!this.dropzone) {
      return;
    }

    this.dropzone.on('success', (file, resp) => {
      this.trigger('added', resp);
    });

    this.dropzone.on('sending', (file, xhr, formData) => {
      formData.append('upload_preset', 'nh0kmjdj');
      this.trigger('busy');
    });

    this.dropzone.on('removedfile', (file) => {
      this.trigger('deleted', file);
    });

    this.dropzone.on('complete', () => {
      this.trigger('free');
    });
  }

}
