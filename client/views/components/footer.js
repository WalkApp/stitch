import React from 'react';
import Component from '../../base/component';
import lang from '../../lang';


export default class Footer extends Component {
  render () {
    return <div className="prt-footer">
      © 2015 {lang.brand.name} | <a href="/about">{lang.captions.about}</a>
    </div>
  }
}
