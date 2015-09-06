import React from 'react';
import Form from '../../base/form';
import lang from '../../lang';


export default class SearchBox extends Form {
  initState () {
    return { model: {} };
  }

  render () {
    return <form className="m-control-group" onSubmit={this.handleSubmit}>
      <input valueLink={this.linkState('model.text')} type="text" className="m-control m-control-sm" placeholder={lang.captions.search} autoFocus={true} />
      <label type="submit" className="m-btn">Search <button type="submit"></button></label>
    </form>
  }
};
