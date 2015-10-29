import React from 'react';
import Component from '../../base/component';


export default class VideoPlayer extends Component {
  initState () {
    return { show: false };
  }

  render () {
    let { show } = this.state;

    return <div className={this.cx('c-video-player', { show })}>
      {show
        ? <div className="c-vp-wrapper">
            <iframe scrolling="no" src="https://www.youtube.com/embed/W6I3P-VRTrE" allowFullScreen></iframe>
          </div>
        : <div className="c-vp-preview" onClick={() => this.setState({ show: true })}>
            <p><i className="icon-play"></i></p>
            <p>About Walk</p>
          </div>
      }
    </div>;
  }
}
