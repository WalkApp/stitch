import React from 'react';
import $ from 'jquery';
import vent from '../../modules/vent';
import Component from '../../base/component';


export default class Dropdown extends Component {
  constructor () {
    super();

    this.handleToggle = this.handleToggle.bind(this);
    this.handleMisClick = this.handleMisClick.bind(this);
  }

  initState () {
    return { show: false };
  }

  handleToggle (event) {
    event.stopPropagation();

    let show = !this.state.show;
    this.setState({ show });
  }

  handleMisClick (event) {
    this.setState({ show: false });
  }

  componentDidMount () {
    this.$toggle = $(`[data-dropdown-toggle="${this.props.id}"]`);

    this.$toggle.on('click', this.handleToggle);
    vent.on('document:click', this.handleMisClick);
  }

  componentWillUnmount () {
    this.$toggle.off('click', this.handleToggle);
    vent.off('document:click', this.handleMisClick);
  }

  render () {
    return <div className={this.cx('c-dropdown', { show: this.state.show })}>
      {this.props.children}
    </div>;
  }
}
