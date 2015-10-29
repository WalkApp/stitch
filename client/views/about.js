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
              Social network to share visited places and events with friends
            </h2>
            <p className="p-a-d-detail">
              Get know what happen in your city <br />
              with Walk you will be always stay in friends news and where they go
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
                  Tell friends about places and events that you have visited
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
                  Tell friends about places and events that you have visited
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
                  Tell friends about places and events that you have visited
                </div>
              </div>
            </section>
          </div>
          <div className="p-a-detail_info">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using r-less normal distribution of letters, as opposed to using
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
