import $ from 'jquery';
import React from 'react';
import Component from '../../base/component';


export default class AutoresizeTextarea extends Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount () {
    this.node = this.refs.textarea.getDOMNode();
    this.nodeOffset = this.node.offsetHeight - this.node.clientHeight;

    this.$textarea = $(this.node);
    this.$textarea.on('input', this.handleInput);
  }

  componentWillUnmount () {
    this.$textarea.off('input', this.handleInput);
  }

  handleInput () {
    this.$textarea
      .css({ height: 'auto' })
      .css({ height: this.node.scrollHeight + this.nodeOffset });
  }

  render () {
    return <textarea {...this.props} ref="textarea"></textarea>
  }
}
