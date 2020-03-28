import React from 'react';
import './_TripCard.scss';

const TripCard = ({ destination, prices, travelers }) => {
  return (
    <div className="trip-card">
      {<div className="trip-card-destination">{destination}</div>}
      <div className="globalprice-card">
        for a total price of <b>{prices.totalPrice} €</b>
      </div>
      <div className="citytrips-card">
        {prices.pricesPerDestination.map(object => {
          return (
            <div key={object.city} className="citytrip-card">
              {console.log(travelers)}
              {console.log(destination)}
              {console.log(travelers[object.city])}
              {object.city} - {Math.round(object.price / travelers[object.city])}€ {''}
              {travelers[object.city] > 1 ? 'x' + ' ' + travelers[object.city] + ' ' : ' '}
              <i class="fas fa-long-arrow-alt-right fa-lg"></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripCard;
