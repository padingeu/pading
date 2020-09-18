import React from 'react';
import catsbasket from '../img/catsbasket.mp4';
import './_Simple.scss';

export default function Simple() {
  return (
    <div className="wrapper">
      <div className="simple-solution">
        <div className="simple-solution-gif">
          <video className="catsbasket" autoPlay="autoplay" loop muted playsInLine width="350px">
            <source src={catsbasket} />
          </video>
        </div>
        <div className="simple-solution-content">
          <h2>Simple solutions for complex connections!</h2>
          <br />
          <p>Planning an Erasmus meeting, joining friends living abroad, gathering with family</p>
          <h4> Pading is a simple solution built to bring you closer to each other</h4>
        </div>
      </div>
    </div>
  );
}
