import React from 'react';
import Component from '../../base/component';


export default class ImagePreview extends Component {
  render () {
    return <div className="c-image_preview">
      <div className="c-ip-thumb" data-dz-thumb></div>
      <div className="c-ip-remove" data-dz-remove>
        <i className="icon-cross"></i>
      </div>
      <div className="c-ip-progress">
        <div className="m-progressbar">
          <span className="m-p-fill" data-dz-uploadprogress></span>
        </div>
      </div>
    </div>;
  }
}
