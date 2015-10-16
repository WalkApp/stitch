import React from 'react';
import _ from 'lodash';
import Component from '../../base/component';
import vent from '../../modules/vent';


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
      acceptedFiles: 'image/jpeg,jpg,png,gif'
    };
  }

  getInitialState () {
    return {
      filesInQueue: 0
    }
  }

  componentDidMount () {
    let self = this;
    let options = this.getDzConfig();

    let Dropzone;
    if (process.browser) Dropzone = require('dropzone');

    if(!Dropzone) return;

    Dropzone.autoDiscover = false;

    this.dropzone = new Dropzone(React.findDOMNode(self), options);
    this.setupEvents();
  }

  componentWillUnmount () {
    if (this.dropzone) {
      var files = this.dropzone.getActiveFiles();

      if (files.length > 0) {
        // Well, seems like we still have stuff uploading.
        // This is dirty, but let's keep trying to get rid
        // of the dropzone until we're done here.
        this.queueDestroy = true;

        var destroyInterval = setInterval(() => {
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
    let className = (this.props.className)
      ? 'filepicker dropzone ' + this.props.className
      : 'filepicker dropzone';

    if (this.props.action) {
      return (
        <form action={this.props.action} className={className}>
          {this.props.children}
        </form>
      );
    }
  }

  setupEvents () {
    if (!this.dropzone) {
      return;
    }

    this.dropzone.on('success', (file, resp) => {
      vent.trigger('imageUploader:added', resp);
    });

    this.dropzone.on('sending', (file, xhr, formData) => {
      formData.append('upload_preset', 'nh0kmjdj');
      vent.trigger('imageUploader:busy');
    });

    this.dropzone.on('removedfile', (file) => {
      vent.trigger('imageUploader:deleted', file);
    });

    this.dropzone.on('complete', () => {
      vent.trigger('imageUploader:free');
    })
  }

}