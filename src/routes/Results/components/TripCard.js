import React from 'react';
import './_TripCard.scss';
import Img from 'react-cool-img';

const TripCard = ({
  destination,
  totalPrice,
  pricesPerDepartureCity,
  travelers,
  carbonFootprint,
}) => {
  let image_path = '';

  try {
    image_path = require(`../../../img/cities/${destination.toLowerCase()}.jpg`);
  } catch (err) {
    image_path = require(`../../../img/cities/defaultcityimage.jpg`);
  }

  return (
    <div className="trip-card">
      <Img src={image_path} alt={destination} />
      <div className="trip-infos">
        <div className="trip-city">
          <span className="trip-city-name">{destination}</span>
          <div className="trip-carbon">
            <span className="trip-carbon-amount">{carbonFootprint}</span>
            <span className="trip-carbon-unity">CO2 t</span>
          </div>
        </div>
        <div className="trip-pricing">
          <span className="trip-pricing-amount">{totalPrice}</span>
          <span className="trip-pricing-currency">EUR / pers</span>
        </div>
   
        <div className="citytrips">
          {pricesPerDepartureCity.map((object) => {
            return (
              <div key={object.city} className="citytrip-card">
                {Math.round(object.price / travelers[object.city])}€ {''}{' '}
                {travelers[object.city] > 1 ? 'x ' + travelers[object.city] + ' ' : ' '} from{' '}
                {object.city}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
