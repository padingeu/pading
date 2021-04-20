import React from 'react';
import './_TripCard.scss';
import Img from "react-cool-img";


const TripCard = ({ destination, prices, travelers }) => {

  let image_path = '';

  try {  
    image_path = require(`../../../img/cities/${destination.toLowerCase()}.jpg`); 
  } catch(err){  
      image_path = require(`../../../img/cities/defaultcityimage.jpg`)
  }

  return (
    <div className="trip-card">
      <Img
        src={image_path}
        alt={destination}
      />
      <div className="trip-infos">
        <div className="trip-city-pricing">
          <div className="trip-city">
            <h4>{destination}</h4>
          </div>
          <div className="trip-pricing">
            <h4>{prices.totalPrice}€</h4>
          </div>
        </div>
        <div className="trip-carbonfootprint">
          <p>
            C02{' '}
            <b className="focus-text">
              <span className="underline"></span>1.399 t
            </b>
          </p>
        </div>
        <div className="citytrips">
          {prices.pricesPerDestination.map((object) => {
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
