import React from 'react';
import Component from '../base/component';
import Header from './components/header';
import Footer from './components/footer';


export default class Upcoming extends Component {
  title () {
    return `${this.lang.brand.name}`;
  }

  render () {
    return <div className="p-user l-layout">
      <Header />
      <div className="l-wrapper">

      </div>
      <Footer />
    </div>
  }
}
