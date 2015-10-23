import React from 'react';
import Form from '../base/form';
import Header from './components/header';
import Footer from './components/footer';
import FormStatus from './partials/form_status';
import UserModel from '../models/user';
import profileStore from '../stores/profile';


export default class Profile extends Form {
  title () {
    return `${this.lang.titles.profile}`;
  }

  initState () {
    return {
      model: profileStore.getState().user,
    };
  }

  componentDidMount () {
    profileStore.listen(this.refreshState);
  }

  componentWillUnmount () {
    profileStore.unlisten(this.refreshState);
  }

  save (model) {
    let user = new UserModel(model);
    let dfd = user.save();

    dfd.fail((xhr) => this.handleAPIError(xhr));
    dfd.done(() => {
      this.showSuccess();
    });
  }

  render () {
    return <div className="l-layout p-profile">
      <Header />
      <div className="l-wrapper">
        <div className="l-content">
          <div className="pure-g">
            <div className="pure-u-6-24">
              <ul className="m-navigation">
                <li className="active">
                  <span className="m-n-line"></span>
                  <a href="/profile"><i className="icon-user"></i>{this.lang.captions.profile}</a>
                </li>
                <li>
                  <span className="m-n-line"></span>
                  <a href="/settings"><i className="icon-settings"></i>{this.lang.captions.settings}</a>
                </li>
              </ul>
            </div>
            <div className="pure-u-18-24">
              <div className="l-right-section">
                <div className="m-panel">
                  <div className="m-p-header">
                    {this.lang.messages.profile}
                    <span className="m-p-h-detail">
                      {this.lang.messages.profile_detail}
                    </span>
                  </div>
                  <div className="m-p-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-control">
                        <label>{this.lang.fields.avatar_url}</label>
                        <input valueLink={this.linkState('model.image_url')} type="text" name="image_url" className="m-control m-control-sm" />
                      </div>
                      <div className="form-control">
                        <label>{this.lang.fields.full_name}</label>
                        <input valueLink={this.linkState('model.full_name')} type="text" name="full_name" className="m-control m-control-sm" />
                      </div>
                      <FormStatus {...this.state} />
                      <div className="l-text-right">
                        <button className="m-btn" type="submit">{this.lang.captions.update}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
  }
}
