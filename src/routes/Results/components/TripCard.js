import React from 'react';

const TripCard = ({destination, prices}) => {

  return (
    <div className="">
      {<div>{destination}</div>}
      {prices.map(object => {
        return (
          <div key={object.city}>
            From {object.city} price is {object.price} € /pers
          </div>
        );
      })}
      <br />
    </div>
  );
}

export default TripCard;
