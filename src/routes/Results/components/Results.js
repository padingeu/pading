import React from 'react';
import TripCard from './TripCard'

export default class Result extends React.Component {

  state = {
    
  };

  getTotalPrice = (trips, destination) => {
    const prices_list = []
    Object.keys(trips).forEach((city, index)=> {
      let tripsForDestination = trips[city].filter((trip) => {
        return trip.cityTo === destination
      })
      let prices = tripsForDestination.map((trip) => {
        return trip.price;
      })
      const price = Math.min.apply(null, prices);
   
      prices_list.push({ city: city, price: price });
    });
  
    return prices_list;
  }

  render() {
    return (
      <div className="travel-result">
            {
        this.props.search.commonDestinations.map((destination, index) => {
          return (
            <div key={index} className="city-div">
              <TripCard
                destination={destination}
                prices={this.getTotalPrice(
                  this.props.search.trips,
                  destination
                )}
              />
            </div>
          );
        })
      }
      </div>
    );

  };
};
