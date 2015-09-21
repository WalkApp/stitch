import React from 'react';
import Component from '../../base/component';


export default class Footer extends Component {
  render () {
    return <div className="c-footer">
      © 2015 {this.lang.brand.name} | <a href="/about">{this.lang.captions.about}</a>
    </div>;
  }
}
