import React from 'react';
import Component from '../../base/component';


export default class ErrorMessage extends Component {
  render () {
    return <div>{ this.props.message
      ? <div className="m-message"><strong>Error: </strong>{this.props.message}</div>
      : false }
    </div>;
  }
}