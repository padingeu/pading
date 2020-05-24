import React from 'react';
import './_Why.scss';
import happycats from '../img/happycats.mp4';

export default function Why() {
  return (
    <div className="wrapper">
      <div className="travel-comparator">
        <h2>The travel comparator for long-distance friendships and family! </h2>
      </div>
      <div className="why-to-use-it">
        <div className="why-to-use-it-gif">
          <video className="why-to-use-it-video" autoPlay="autoplay" loop>
            <source src={happycats} />
          </video>
        </div>
        <div className="why-to-use-it-text">
          <div className="why-to-use-it-title">
            <h3>Why to use pading?</h3>
          </div>
          <div className="why-to-use-it-content">
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>1</h3>
              </div>
              <div className="why-to-use-it-details">
                <h4>Save Time</h4>
                <p>
                  <b>In just one search</b>, you and your team can find your next common destination
                </p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>2</h3>
              </div>
              <div className="why-to-use-it-details">
                <h4>Save Money</h4>
                <p>
                  <b>Explore the cheapest destinations</b> with people you plan to meet
                </p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>3</h3>
              </div>
              <div className="why-to-use-it-details">
                <h4>Book Easily</h4>
                <p>
                  Share trip details with your team,<b> book easily... travel and meet</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
