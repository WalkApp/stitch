import React from 'react';
import vent from '../../modules/vent';
import Form from '../../base/form';
import { buildUrl } from 'libs/location';


export default class HeaderSearchBox extends Form {
  initState () {
    return { model: {} };
  }

  save (model) {
    this.refreshState();
    this.forceUpdate();
    vent.trigger('routeTo', buildUrl('/search', { q: model.text }));
  }

  render () {
    return <form className="c-h-searchbox" onSubmit={this.handleSubmit}>
      <div className="m-control-group">
        <input valueLink={this.linkState('model.text')} type="text" className="m-control m-control-sm" placeholder={this.lang.captions.search} />
        <label type="submit" className="m-btn"><i className="icon-search"></i><button type="submit"></button></label>
      </div>
    </form>;
  }
};
