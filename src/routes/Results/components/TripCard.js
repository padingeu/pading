import React from 'react';

const TripCard = ({ destination, prices, travelers }) => {
  return (
    <div className="">
      {<div>{destination}</div>}
      {prices.pricesPerDestination.map(object => {
        return (
          <div key={object.city}>
            {console.log(travelers)}
            {console.log(destination)}
            {console.log(travelers[object.city])}
            From {object.city} price is {object.price} € ({travelers[object.city]}{' '}
            {travelers[object.city] > 1 ? 'people' : 'person'})
          </div>
        );
      })}
      Total price {prices.totalPrice} €
      <br />
    </div>
  );
};

export default TripCard;
