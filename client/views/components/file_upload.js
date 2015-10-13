import React from 'react';
import _ from 'lodash';
import Component from '../../base/component';

let Dropzone;


export default class FileUpload extends Component {
  /**
   * Configuration of Dropzone.js. Defaults are
   * overriden by the 'dzConfig' property
   * For a full list of possible configurations,
   * please consult
   * http://www.dropzonejs.com/#configuration
   */

  getDzConfig () {
    let options;
    let defaults = {
      url: this.props.config.postUrl ? this.props.config.postUrl : null
    };

    if (this.props.dzConfig) {
      options = _.extend({}, defaults, this.props.dzConfig);
    } else {
      options = defaults;
    }

    return options;
  }

  getInitialState () {
    return {
      files: []
    }
  }

  componentDidMount () {
    let self = this;
    let options = this.getDzConfig();

    if (process.browser) Dropzone = require('dropzone');

    Dropzone.autoDiscover = false;

    if (!this.props.config.postUrl && !this.props.eventHandlers.drop) {
      console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
    }

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

    if (!this.props.config.postUrl && this.props.action) {
      return (
        <form action={this.props.action} className={className}>
          {this.props.children}
        </form>
      );
    } else {
      return (
        <div className={className}>
          {this.props.children}
        </div>
      );
    }
  }

  /**
   * Takes event handlers in this.props.eventHandlers
   * and binds them to dropzone.js events
   */
  setupEvents () {
    let eventHandlers = this.props.eventHandlers;
    debugger;

    if (!this.dropzone || !eventHandlers) {
      return;
    }

    for (let eventHandler in eventHandlers) {
      if (eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
        // Check if there's an array of event handlers
        if (Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
          for (let i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
            // Check if it's an init handler
            if (eventHandler === 'init') {
              eventHandlers[eventHandler][i](this.dropzone);
            } else {
              this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
            }
          }
        } else {
          if (eventHandler === 'init') {
            eventHandlers[eventHandler](this.dropzone);
          } else {
            this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
          }
        }
      }
    }

    this.dropzone.on('addedfile', (file) => {
      if (file) {
        let files = this.state.files;

        if (!files) {
          files = [];
        }

        files.push(file);

        this.setState({files: files});
      }
    });

    this.dropzone.on('removedfile', (file) => {
      if (file) {
        let files = this.state.files;

        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            if (files[i].name === file.name && files[i].size === file.size) {
              files.splice(i, 1);
            }
          }

          this.setState({files: files});
        }
      }
    });
  }

}