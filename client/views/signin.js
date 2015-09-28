import React from 'react';
import Form from '../base/form';
import Footer from './components/footer';
import FormStatus from './components/form_status';
import auth from '../modules/auth';


export default class Signin extends Form {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.sign_in}`;
  }

  initState () {
    return { model: {} };
  }

  save (model) {
    let dfd = auth.signin(model);
    dfd.fail((xhr) => this.handleAPIError(xhr));
  }

  render () {
    return <div className="p-login l-layout">
      <div className="p-l-top"></div>
      <div className="p-l-body">
        <div className="p-l-container">
          <div className="l-text-center">
            <a href="/" className="m-logo">
              <h1 className="m-l-title">{this.lang.brand.name}</h1>
              <h2 className="m-l-tagline">{this.lang.brand.tagline}</h2>
            </a>
          </div>
          <form className="p-l-form" onSubmit={this.handleSubmit}>
            <div className="m-control-list">
              <div className="m-control-group">
                <span className="m-cg-icon icon-user"></span>
                <input valueLink={this.linkState('model.username')} type="text" className="m-control" placeholder={this.lang.fields.username} required />
              </div>
              <div className="m-control-group">
                <span className="m-cg-icon icon-lock"></span>
                <input valueLink={this.linkState('model.password')} type="password" className="m-control" placeholder={this.lang.fields.password} required />
              </div>
            </div>
            <FormStatus {...this.state} />
            <p className="l-text-center">
              <button type="submit" className="m-btn">{this.lang.captions.sign_in}</button>
            </p>
          </form>
          <p>
            <a href="/signup" className="m-btn m-btn-block m-btn-link">{this.lang.captions.sign_up}</a>
          </p>
        </div>
      </div>
      <div className="p-l-bottom"></div>
      <Footer />
    </div>;
  }
}
