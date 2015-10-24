import $ from 'jquery';
import Dropzone from 'dropzone';


export default class Uploader extends Dropzone {
  init () {
    super.init();

    this.on('addedfile', this.handleAdd);
    this.on('removedfile', this.handleRemove);
    this.on('success', this.handleSuccess);
    this.on('complete', this.handleComplete);
  }

  handleAdd (file) {
    file.$el = $(file.previewElement);
  }

  handleRemove (file) {
    if (!file.xhr) throw new Error('xhr object cannot be undefined');
  }

  handleSuccess (file, resp) {
    file.$el.find('[data-dz-thumb]').css({ backgroundImage: `url(${resp.url})` });
  }

  handleComplete (file) {
    // Need to delete processing class manually, stupid dropzone bug
    file.$el.removeClass('dz-processing');
  }
}
