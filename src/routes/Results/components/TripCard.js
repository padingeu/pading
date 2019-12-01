import React from 'react';

const TripCard = ({destination}) => {


  return (
    <div className="cities-departure">
      {
        <p>{destination}</p>
      }
    </div>
  )
}

export default TripCard;
