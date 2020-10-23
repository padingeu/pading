import React from 'react';
import './_TripCardSkeleton.scss';

const TripCardSkeleton = props => (

<div>
  <div className="trip-card-skeleton">
  </div>
  <div className="trip-infos-skeleton">
    <div className="trip-city-pricing-skeleton">
      <div className="trip-city-skeleton">
      </div>
      <div className="trip-pricing-skeleton">
      </div>
    </div>
    <div className="trip-carbonfootprint-skeleton">
    </div>
  </div>
</div>
);

export default TripCardSkeleton;