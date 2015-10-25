import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import Component from '../../base/component';
import ImagePreview from './image_preview';


let Uploader;
if (process.browser) Uploader = require('../../modules/uploader');

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
      // FIXME: Change to proper url
      url: 'https://api.cloudinary.com/v1_1/walk/image/upload',

      acceptedFiles: 'image/*',

      clickable: [`[data-uploader="${this.props.id}"]`],
      previewsContainer: `[data-uploader-preview="${this.props.id}"]`,

      previewTemplate: React.renderToString(<ImagePreview />),
      dictDefaultMessage: view.lang.messages.drop_images,

      init: function () {
        this.on('success', (file, resp) => {
          view.trigger('added', resp.url);
        });

        this.on('removedfile', (file) => {
          view.trigger('deleted', JSON.parse(file.xhr.response).url);
        });

        this.on('sending', (file, xhr, formData) => {
          // FIXME: Remove when endpoint is ready
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
    this.$uploader.addClass('dragging');
  }

  handleDragleave (event) {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.$uploader.removeClass('dragging');
  }

  componentDidMount () {
    this.$win = $(window);
    this.$uploader = $(this.refs.uploader.getDOMNode());

    this.$win.on('dragenter', this.handleDragenter);
    this.$win.on('mouseleave', this.handleDragleave);

    this.uploader = new Uploader(this.$uploader[0], this.options());
  }

  componentWillUnmount () {
    this.$win.off('dragenter', this.handleDragenter);
    this.$win.off('mouseleave', this.handleDragleave);

    if (this.uploader) this.uploader.destroy();
  }

  reset () {
    if (this.uploader) this.uploader.removeAllFiles();
  }

  render () {
    return <div className="c-image_uploader dropzone" ref="uploader"></div>;
  }
}
