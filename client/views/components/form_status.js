import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import lang from '../../lang';


export default class FormStatus extends Component {
  render () {
    let type = _.result(this.props, 'message.type')
    let isError = type === 'error';
    let prefix = '';

    if (isError) prefix = lang.captions.error;

    return <div>{this.props.message
      ? <div className={this.cx('m-message', { 'm-message-danger': isError })}>
          <strong>{prefix}: </strong>{this.props.message.text}
        </div>
      : false }
    </div>;
  }
}
