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
            <h4>Share news and feedback about public places and events in your city!</h4>
            <p>
              Share your experience on visited places and events with the community.
            </p>
            <p>
              Find out which events and places your friends attended and obtain their feedback.
            </p>
            <p>
              Create your own event and invite friends while keepin in touch with an upcoming events.
            </p>
            <p>
              Discover and explore new places through community members’ feedback. <a href="/about">Learn More</a>
            </p>
          </section>
        </div>
      </div>
      <div className="p-w-bottom"></div>
      <Footer />
    </div>;
  }
}
