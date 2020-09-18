import React from 'react';
import './_Why.scss';
import happycats from '../img/happycats.mp4';

export default function Why() {
  return (
    <div className="wrapper">
      <div className="why-to-use-it">
        <div className="why-to-use-it-gif">
          <video className="why-to-use-it-video" autoPlay="autoplay" loop muted playsInLine>
            <source src={happycats} />
          </video>
        </div>
        <div className="why-to-use-it-text" id="why">
          <div className="why-to-use-it-title">
            <h2>Why use pading?</h2>
          </div>
          <div className="why-to-use-it-content">
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h2>1</h2>
              </div>
              <div className="why-to-use-it-details">
                <h3>Save Time</h3>
                <p>
                  <b>In just one search</b>, you and your team can find your next common destination
                </p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h2>2</h2>
              </div>
              <div className="why-to-use-it-details">
                <h3>Save Money</h3>
                <p>
                  <b>Explore the cheapest destinations</b> with people you plan to meet
                </p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h2>3</h2>
              </div>
              <div className="why-to-use-it-details">
                <h3>Book Easily</h3>
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
