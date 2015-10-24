import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import Component from '../../base/component';


let Dropzone;
if (process.browser) Dropzone = require('dropzone');

export default class ImageUploader extends Component {
  constructor (props) {
    super(props);
    this.isDragging = false;
    this.handleDragenter = this.handleDragenter.bind(this);
    this.handleDragleave = this.handleDragleave.bind(this);
  }

  options () {
    let view = this;

    return {
      url: 'https://api.cloudinary.com/v1_1/walk/image/upload',

      addRemoveLinks: true,
      acceptedFiles: 'image/*',

      dictDefaultMessage: this.lang.messages.drop_images,

      clickable: [`[data-uploader="${this.props.id}"]`],

      init: function () {
        this.on('success', (file, resp) => {
          view.trigger('added', resp.url);
        });

        this.on('removedfile', (file) => {
          if (!file.xhr) throw new Error('xhr object cannot be undefined');
          view.trigger('deleted', JSON.parse(file.xhr.response).url);
        });

        this.on('sending', (file, xhr, formData) => {
          formData.append('upload_preset', 'nh0kmjdj');
          view.trigger('busy');
        });

        this.on('complete', () => {
          view.trigger('free');
        });
      },
    };
  }

  handleDragenter () {
    this.isDragging = true;
    this.$dropzone.addClass('dragging');
  }

  handleDragleave (event) {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.$dropzone.removeClass('dragging');
  }

  componentDidMount () {
    this.$win = $(window);
    this.$dropzone = $(this.refs.dropzone.getDOMNode());

    this.$win.on('dragenter', this.handleDragenter);
    this.$win.on('mouseleave', this.handleDragleave);

    this.dropzone = new Dropzone(this.$dropzone[0], this.options());
  }

  componentWillUnmount () {
    this.$win.off('dragenter', this.handleDragenter);
    this.$win.off('mouseleave', this.handleDragleave);

    if (this.dropzone) this.dropzone.destroy();
  }

  render () {
    return <div className="c-image_uploader dropzone" ref="dropzone"></div>;
  }
}
