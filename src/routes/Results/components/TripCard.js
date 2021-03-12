import React from 'react';
import './_TripCard.scss';

const TripCard = ({ destination, prices, travelers }) => {
  return (
    <div className="trip-card">
      <img
        src="https://a.cdn-hotels.com/gdcs/production43/d534/1bd81a82-de7a-4cf5-a625-ca3cd27a3346.jpg"
        alt="booking tickets and traveling to bilbao"
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
