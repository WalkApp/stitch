import React from 'react';
import Form from '../base/form';
import Footer from './components/footer';
import lang from '../lang';
import UserModel from '../models/user';
import user from '../modules/user';


export default class Signin extends Form {
  title () {
    return `${lang.brand.name} | ${lang.titles.sign_up}`;
  }

  initState () {
    return { model: {} }
  }

  save (model) {
    if (model.confirm_password !== model.password) {
      return this.showError('invalid_confirm_password');
    }

    var
      dfd,
      newUser = new UserModel(model);

    dfd = newUser.save().then(() => {
      return user.signin(newUser.toJSON())
    });

    dfd.fail((xhr) => this.handleAPIError(xhr));
  }

  render () {
    return <div className="p-login l-layout">
      <div className="p-l-top"></div>
      <div className="p-l-body">
        <div className="p-l-container">
          <a href="/" className="m-logo centered">
            <h1 className="m-l-title">{lang.brand.name}</h1>
            <h2 className="m-l-tagline">{lang.brand.tagline}</h2>
          </a>
          <form className="p-l-form" onSubmit={this.handleSubmit}>
            <div className="m-control-group">
              <span className="m-cg-icon icon-user"></span>
              <input valueLink={this.linkState('model.full_name')} type="text" className="m-control" placeholder={lang.fields.full_name} />
            </div>
            <div className="m-control-group">
              <span className="m-cg-icon icon-user"></span>
              <input valueLink={this.linkState('model.username')} type="text" className="m-control" placeholder={lang.fields.username} required />
            </div>
            <div className="m-control-list">
              <div className="m-control-group">
                <span className="m-cg-icon icon-lock"></span>
                <input valueLink={this.linkState('model.password')} type="password" className="m-control" placeholder={lang.fields.password} required />
              </div>
              <div className="m-control-group">
                <span className="m-cg-icon icon-lock"></span>
                <input valueLink={this.linkState('model.confirm_password')} type="password" className="m-control" placeholder={lang.fields.confirm_password} required />
              </div>
            </div>
            <p className="l-text-center">
              <button type="submit" className="m-btn">{lang.captions.sign_up}</button>
            </p>
          </form>
          <p>
            <a href="/signin" className="m-btn m-btn-block m-btn-link">{lang.captions.sign_in}</a>
          </p>
        </div>
      </div>
      <div className="p-l-bottom"></div>
      <Footer />
    </div>
  }
}
