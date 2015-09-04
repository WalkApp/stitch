import React from 'react';
import Form from '../base/form';
import Footer from './components/footer';
import lang from '../lang';


export default class Signin extends Form {
  title () {
    return `${lang.brand.name} | ${lang.titles.sign_up}`;
  }

  initState () {
    return { model: {} }
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
              <input valueLink={this.linkState('model.username')} type="text" className="m-control" placeholder={lang.fields.username} />
            </div>
            <div className="m-control-list">
              <div className="m-control-group">
                <span className="m-cg-icon icon-lock"></span>
                <input valueLink={this.linkState('model.password')} type="password" className="m-control" placeholder={lang.fields.password} />
              </div>
              <div className="m-control-group">
                <span className="m-cg-icon icon-lock"></span>
                <input valueLink={this.linkState('model.confirm_password')} type="password" className="m-control" placeholder={lang.fields.confirm_password} />
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
