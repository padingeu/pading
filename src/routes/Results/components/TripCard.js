import React from 'react';
import './_TripCard.scss';
import Img from 'react-cool-img';
import lodash from 'lodash';

const TripCard = ({
  destination,
  totalPrice,
  pricesPerDepartureCity,
  travelers,
  carbonFootprint,
}) => {
  let image_path = '';

  try {
    image_path = require(`../img/cities/${destination.toLowerCase()}.jpg`);
  } catch (err) {
    image_path = require(`../img/cities/defaultcityimage.jpg`);
  }

  return (
    <div className="trip-card">
      <Img src={image_path} alt={destination} />
      <div className="trip-infos">
        <div className="trip-city">
          <span className="trip-city-name">{destination}</span>
          <div className="trip-carbon">
            <span className="trip-carbon-amount">{carbonFootprint}</span>
            <span className="trip-carbon-unity">tonnes CO2</span>
          </div>
        </div>
        <div className="trip-pricing">
          <span className="trip-pricing-amount">{Math.round(totalPrice / lodash.sum(Object.values(travelers)))}</span>
          <span className="trip-pricing-currency">EUR / pers</span>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
