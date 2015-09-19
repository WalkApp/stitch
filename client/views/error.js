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
      <h1>Error</h1>
    </div>;
  }
}