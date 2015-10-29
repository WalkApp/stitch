import React from 'react';
import Component from '../base/component';
import Footer from './components/footer';
import VideoPlayer from './components/video_player';


export default class About extends Component {
  title () {
    return `${this.lang.titles.about} | ${this.lang.brand.name}`;
  }

  render () {
    return <div className="l-layout p-about">
      <div className="l-wrapper">
        <div className="p-a-top">
          <div className="l-container">
            <a href="/" className="m-logo">
              <h1 className="m-l-title">{this.lang.brand.name}</h1>
            </a>
          </div>
        </div>
        <div className="l-container">
          <div className="p-a-description">
            <h2 className="p-a-d-title">
              Social Network for Sharing News and Feedback About <br /> Public Places and Events in Your City
            </h2>
            <p className="p-a-d-detail">
              Find suitable place, invite guests, and obtain feedback through photos and comments
            </p>
          </div>
          <div className="p-a-divider"><span className="p-a-d-circle"></span></div>
          <h2 className="p-a-how_works">
            How it works
          </h2>
          <div className="p-a-video">
            <VideoPlayer />
          </div>
          <div className="p-a-summary pure-g">
            <section className="p-a-s-item pure-u-8-24">
              <div className="m-summary_card">
                <div className="m-sc-banner">
                  <figure>
                    <div className="m-sc-b-wrapper">
                      <div className="m-sc-b-icon"><i className="icon-tell"></i></div>
                    </div>
                  </figure>
                  <figcaption>
                    Share and Search
                  </figcaption>
                </div>
                <div className="m-sc-text">
                  <p>Share your experience on visited places and events with the community</p>
                  <p>Find out which events and places your friends attended and obtain their feedback</p>
                </div>
              </div>
            </section>
            <section className="p-a-s-item pure-u-8-24">
              <div className="m-summary_card m-summary_card-green">
                <div className="m-sc-banner">
                  <figure>
                    <div className="m-sc-b-wrapper">
                      <div className="m-sc-b-icon"><i className="icon-upcoming"></i></div>
                    </div>
                  </figure>
                  <figcaption>
                    Create Event
                  </figcaption>
                </div>
                <div className="m-sc-text">
                  <p>Create your own event attach photos, description and get know who will come</p>
                </div>
              </div>
            </section>
            <section className="p-a-s-item pure-u-8-24">
              <div className="m-summary_card">
                <div className="m-sc-banner">
                  <figure>
                    <div className="m-sc-b-wrapper">
                      <div className="m-sc-b-icon"><i className="icon-invite"></i></div>
                    </div>
                  </figure>
                  <figcaption>
                    Invite friends
                  </figcaption>
                </div>
                <div className="m-sc-text">
                  <p>
                    Send invitations through Walk accounts, e-mails, or even phone messages which can be used for guests not registered on the Walk
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="p-a-detail_info">
            Walk will become a storage and provider of an up-to-date, reliable, and unbiased information about public places and events. As a future work based on collected data we will develop layout and intelligent features including recommender based on preferences, history, user location and price to make search of the place more effective.
          </div>
          <div className="p-a-join">
            <a className="m-btn" href="/signup">Try Now</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
  }
}
