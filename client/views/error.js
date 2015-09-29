import React from 'react';
import Component from '../base/component';
import Footer from './components/footer';
import currentUser from '../stores/current_user';


export default class Error extends Component {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.error}`;
  }

  render () {
    return <div className="l-layout p-error">
      <div className="p-e-logo">
        <a href={`/user/${currentUser.get('username')}`} className="m-logo">
          <h1 className="m-l-title">{this.lang.brand.name}</h1>
          <h2 className="m-l-tagline">{this.lang.brand.tagline}</h2>
        </a>
      </div>
      <div className="p-e-top"></div>
      <div className="p-e-description">
        <h1 className="p-e-d-title">{this.lang.messages.error_title}</h1>
        <p className="p-e-d-message">{this.lang.messages.error_description}</p>
      </div>
      <div className="p-e-bottom"></div>
      <Footer />
    </div>;
  }
}
