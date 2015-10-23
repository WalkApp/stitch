import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';


export default class FormStatus extends Component {
  render () {
    let type = _.result(this.props, 'message.type');
    let isError = type === 'error';
    let isSuccess = type === 'success';
    let prefix = '';

    if (isError) prefix = this.lang.captions.error;
    if (isSuccess) prefix = this.lang.captions.success;

    return <div>{this.props.message
      ? <div className={this.cx('m-message', { 'm-message-danger': isError, 'm-message-success': isSuccess })}>
          <strong>{prefix}: </strong>{this.props.message.text}
        </div>
      : false }
    </div>;
  }
}
