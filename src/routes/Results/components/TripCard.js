import React from 'react';

const TripCard = ({ destination, prices }) => {
  return (
    <div className="">
      {<div>{destination}</div>}
      {prices.pricesPerDestination.map(object => {
        return (
          <div key={object.city}>
            From {object.city} price is {object.price} € /pers
          </div>
        );
      })}
      Prix total {prices.totalPrice} €
      <br />
    </div>
  );
};

export default TripCard;
