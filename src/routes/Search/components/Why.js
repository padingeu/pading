import React from 'react';
import happyCatsGif from '../img/happy-cats.gif';
import happyCatsVideo from '../img/happy-cats.mp4';
import greenShape from '../../../img/green-shape.svg';
import yellowShape from '../../../img/yellow-travel-shape.svg';
import './_Why.scss';

export default function Why() {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform);

  return (
    <div className="wrapper">
      <img src={greenShape} alt="green shape" className="green-shape"/>
      <img src={yellowShape} alt="yellow travel shape" className="yellow-shape"/>
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
            <h2 className="focus-text"><span className="underline"></span>WHY USE PADING ?</h2>
          </div>
          <div className="why-to-use-it-content">
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>1</h3>
              </div>
              <div className="why-to-use-it-details">
                <h3>SAVE TIME</h3>
                <p>In just one search, you and your friends can find your next travel meeting point</p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>2</h3>
              </div>
              <div className="why-to-use-it-details">
                <h3>SAVE MONEY</h3>
                <p>Explore the cheapest destinations and journeys with people you plan to meet</p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>3</h3>
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
