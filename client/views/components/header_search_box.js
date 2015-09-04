import React from 'react';
import vent from '../../modules/vent';
import Form from '../../base/form';
import lang from '../../lang';


export default class HeaderSearchBox extends Form {
  initState () {
    return { model: {} };
  }

  render () {
    return <form className="c-header-search-box" onSubmit={this.handleSubmit}>
      <div className="m-control-group">
        <span className="m-cg-icon icon-search"></span>
        <input valueLink={this.linkState('model.text')} type="text" className="m-control" placeholder={lang.captions.search} />
      </div>
    </form>
  }
};