import React from 'react';
import Component from '../../base/component';


export default class Event extends Component {
  render () {
    var { event } = this.props.data;

    return <div className="c-post m-panel">
      {event.image_url
        ? <img className="c-p-image" src={event.image_url} />
        : false
      }
      <div className="c-p-info m-p-note">
        <i className="icon-pin"></i> {event.address}
      </div>
      <div className="m-p-body">
        <p>
          {event.description}
        </p>
      </div>
    </div>
  }
}
