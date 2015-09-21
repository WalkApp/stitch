import React from 'react';
import Form from '../../base/form';
import EventModel from '../../models/event';


export default class QuickEvent extends Form {
  initState () {
    return {
      active: false,
      model: { description: '' },
    };
  }

  save (model) {
    let event = new EventModel(model);
    event.username = 'profile';

    let dfd = event.save();
    dfd.fail((xhr) => this.handleAPIError(xhr));
    dfd.done(() => {
      this.trigger('save', event.toJSON());
      this.refreshState();
    });
  }

  render () {
    var { active } = this.state;

    return <form className="c-quick-post" onSubmit={this.handleSubmit}>
      {active
        ? <div>
        <div className="m-control-list">
          <textarea valueLink={this.linkState('model.description')} placeholder={this.lang.messages.add_event} className="m-control" required />
          <input valueLink={this.linkState('model.date')} placeholder={this.lang.fields.event_date} type="text" className="m-control" />
          <input valueLink={this.linkState('model.address')} placeholder={this.lang.fields.address} type="text" className="m-control" />
          <input valueLink={this.linkState('model.image_url')} placeholder={this.lang.fields.image_url} type="text" className="m-control" />
        </div>
        <p className="l-text-right">
          <button className="m-btn" type="submit">{this.lang.captions.add_event}</button>
        </p>
      </div>
        : <div>
        <div className="m-control-list">
          <textarea valueLink={this.linkState('model.description')} className="m-control-static" onClick={() => this.setState({ active: true })} placeholder={this.lang.messages.add_event} />
        </div>
      </div>
      }
    </form>;
  }
}
