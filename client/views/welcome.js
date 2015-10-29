import React from 'react';
import Component from '../base/component';
import Footer from './components/footer';
import currentUser from '../stores/current_user';


export default class Welcome extends Component {
  title () {
    return `${this.lang.titles.welcome} | ${this.lang.brand.name}`;
  }

  render () {
    return <div className="l-layout p-welcome">
      <div className="p-w-top"></div>
      <div className="p-w-body">
        <div className="p-w-container">
          <section>
            <div className="m-logo m-logo-large">
              <h1 className="m-l-title">{this.lang.brand.name}</h1>
              <h2 className="m-l-tagline">{this.lang.brand.tagline}</h2>
            </div>
            <p>
              <a href="/signin" className="m-btn">{this.lang.captions.start}</a>
            </p>
          </section>
          <section>
            <h4>Get know what happen in your city!</h4>
            <p>
              Tell people who follow you about places and events that you have visited. Be stay in all friends news and join them.
            </p>
            <p>
              Find place by type, addres or type. Read your friends feedback about it.
            </p>
            <p>
              Create events and send invitations to people who even aren't registered in Walk by sms or email. <a href="/about">Read More</a>
            </p>
          </section>
        </div>
      </div>
      <div className="p-w-bottom"></div>
      <Footer />
    </div>;
  }
}
