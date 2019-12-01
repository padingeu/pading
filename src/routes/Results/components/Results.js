import React from 'react';
import TripCard from './TripCard'

export default class Result extends React.Component {

  state = {
    
  };

  getTotalPrice = (cityName, trips) => {
    let totalPrice = 0
    for(let i = 0; i < trips.length; i++) {
      trips[i].filter((trip) =>
      {
        return trip.cityTo === cityName
      })
      totalPrice += trips[i].price
    }
    return totalPrice
  }

  render() {
    return (
      <div className="travel-result">
            {
        ['Lille', 'Manchester', 'Paris'].map((destination, index) => {
          return (
            <div key={index} className="city-div">
              <TripCard 
                destination={destination}
                price={this.getTotalPrice(destination, this.props.results.trips)}/>
            </div>
          )
        })
      }
      </div>
    );

  };
};
