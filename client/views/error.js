import React from 'react';
import Component from '../base/component';
import Footer from './components/footer';


export default class Error extends Component {
  title () {
    return `${this.lang.brand.name} | ${this.lang.titles.error}`;
  }

  render () {
    return <div className="l-layout p-error">
      <div className="p-e-logo m-logo">
        <h1 className="m-l-title">{this.lang.brand.name}</h1>

        <h2 className="m-l-tagline">{this.lang.brand.tagline}</h2>
      </div>
      <div className="p-e-top"></div>
      <div className="p-e-description">
        <h1>{this.lang.messages.error_title}</h1>
        <p>{this.lang.messages.error_description}</p>
      </div>
      <div className="p-e-bottom"></div>
      <Footer />
    </div>;
  }
}