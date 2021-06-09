import React from 'react';
import happyCatsGif from '../img/happycats.gif';
import happyCatsVideo from '../img/happycats.mp4';
import './_Why.scss';

export default function Why() {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform);

  return (
    <div className="wrapper">
      <div className="why-to-use-it">
        <div className="why-to-use-it-gif">
          {isIOS ? (
            <div>
              <img src={happyCatsGif} className="happy-cats" alt="happy cats" />
            </div>
          ) : (
            <video className="happy-cats" autoPlay="autoplay" loop muted playsInline>
              <source src={happyCatsVideo} />
            </video>
          )}
        </div>
        <div className="why-to-use-it-text" id="why">
          <div className="why-to-use-it-title">
            <h2>WHY USE PADING ?</h2>
          </div>
          <div className="why-to-use-it-content">
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h2>1</h2>
              </div>
              <div className="why-to-use-it-details">
                <h3>SAVE TIME</h3>
                <p>In just one search, you and your friends can find your next travel meeting point</p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h2>2</h2>
              </div>
              <div className="why-to-use-it-details">
                <h3>SAVE MONEY</h3>
                <p>Explore the cheapest destinations and journeys with people you plan to meet</p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h2>3</h2>
              </div>
              <div className="why-to-use-it-details">
                <h3>BOOK EASILY</h3>
                <p>Share trip details with your team, book easily .. travel and meet !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
