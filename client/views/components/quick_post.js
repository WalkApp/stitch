import React from 'react';
import Form from '../../base/form';
import lang from '../../lang';


export default class QuickPost extends Form {
  initState () {
    return {
      active: false,
      model: {}
    }
  }

  render () {
    var { active } = this.state;

    return <form className="c-quick-post">
      {active
        ? <div>
            <div className="m-control-list">
              <textarea valueLink={this.linkState('model.description')} placeholder={lang.messages.add_post} className="m-control" />
              <input valueLink={this.linkState('model.address')} placeholder={lang.fields.address} type="text" className="m-control" />
              <input valueLink={this.linkState('model.image_url')} placeholder={lang.fields.image_url} type="text" className="m-control" />
            </div>
            <p className="l-text-right">
              <button className="m-btn" type="submit">{lang.captions.add_post}</button>
            </p>
          </div>
        : <div>
            <div className="m-control-list">
              <textarea valueLink={this.linkState('model.description')} className="m-control-static" onClick={() => this.setState({ active: true })} placeholder={lang.messages.add_post} />
            </div>
          </div>
      }
    </form>
  }
}
