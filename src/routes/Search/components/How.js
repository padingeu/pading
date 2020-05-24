import React from 'react';
import padingapp from '../img/padingapp.mp4';
import './_How.scss';

export default function How() {
  return (
    <div className="wrapper">
      <div className="how-to-use-it">
        <div className="how-to-use-it-title">
          <h3>How to plan my trip?</h3>
        </div>
        <div className="how-to-use-it-content">
          <div className="how-to-use-it-content-card">
            <div className="how-to-use-it-number">
              <h3>1</h3>
            </div>
            <div className="how-to-use-it-details">
              <h4>Select your travel dates</h4>
              <p>Fill your travel dates, one-way/return</p>
            </div>
          </div>
          <div className="how-to-use-it-content-card">
            <div className="how-to-use-it-number">
              <h3>2</h3>
            </div>
            <div className="how-to-use-it-details">
              <h4>Tell us where your journey begin</h4>
              <p>Enter all departure cities you and your friends/family come from</p>
            </div>
          </div>
          <div className="how-to-use-it-content-card">
            <div className="how-to-use-it-number">
              <h3>3</h3>
            </div>
            <div className="how-to-use-it-details">
              <h4>Explore all destinations</h4>
              <p>Explore all common destinations that match your own departure cities</p>
            </div>
          </div>
        </div>
        <div className="how-to-use-it-video">
          <video className="videoapp" loop autoPlay="autoplay" height="600px">
            <source src={padingapp} />
          </video>
        </div>
      </div>
    </div>
  );
}
