import React from 'react';
import Component from '../base/component';
import Footer from './components/footer';
import lang from '../lang';

export default class Error extends Component {
  title () {
    return `${lang.brand.name} | ${lang.titles.welcome}`;
  }

  render () {
    return <div className="l-layout p-error">
      <div className="p-error-empty"></div>
      <div className="p-error-logo m-logo">
        <h1 className="m-l-title">{lang.brand.name}</h1>
        <h2 className="m-l-tagline">{lang.brand.tagline}</h2>
      </div>
      <div className="p-error-desc">
        <h1>Oops</h1>
        <p>Something went wrong</p>
      </div>
      <div className="p-error-footer"><Footer /></div>
    </div>;
  }
}