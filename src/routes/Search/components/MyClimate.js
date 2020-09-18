import React from 'react';
import './_MyClimate.scss';

export default function Simple() {
  return (
    <div className="wrapper">
      <div className="myclimate">
        <div className="myclimate-content">
          <h2>We love our planet</h2>
          <br />
          <p>Offsetting carbon footprint to make travel more eco-friendly</p>
          <h4>
            Pading calculates the climate impact of each destination so you can give your preference
            to low carbon footprint destination and compensate your Co2 emissions
          </h4>
        </div>
        <div className="myclimate-img">
          <i className="fas fa-globe-europe fa-10x"></i>
        </div>
      </div>
    </div>
  );
}
