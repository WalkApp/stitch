import vent from './vent';
import $ from 'jquery';


class WindowEvents {
  constructor () {
    this.$doc = $(document);
    this.$win = $(window);

    this.$doc.on('click', this.handleClick);
    vent.on('route:after', this.handlePageChanged, this);
  }

  handleClick (event) {
    vent.trigger('document:click', event);
  }

  handlePageChanged () {
    this.$win.scrollTop(0);
  }
}

export default new WindowEvents();
