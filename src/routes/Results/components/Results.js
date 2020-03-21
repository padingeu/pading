import React from 'react';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';
import TripCard from './TripCard';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Result extends React.Component {
  getTotalPrice = (trips, destination) => {
    const pricesList = [];
    let totalPrice = 0;
    Object.keys(trips).forEach(city => {
      let tripsForDestination = trips[city].filter(trip => {
        return trip.cityTo === destination;
      });
      let prices = tripsForDestination.map(trip => {
        return trip.price;
      });
      const price = Math.min.apply(null, prices);
      totalPrice += price;
      pricesList.push({ city: city, price: price });
    });

    return {
      pricesPerDestination: pricesList,
      totalPrice: totalPrice
    };
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="travel-results">
<<<<<<< HEAD
          <div className="formsearch-results"></div>
=======
          <div className="formsearch-results">
            <FormSearch />
          </div>
>>>>>>> formsearch-resultspage
          <div className="cards-map-results">
            <div className="cards-results">
              <LinearProgress />
              {console.log(this.props)}
              {this.props.search.commonDestinations.map((destination, index) => {
                return (
                  <div key={index} className="city-div">
                    <TripCard
                      destination={destination}
                      prices={this.getTotalPrice(this.props.search.trips, destination)}
                      travelers={this.props.search.travelers}
                    />
                  </div>
                );
              })}
            </div>
            <div className="map-results"></div>
          </div>
        </div>
      </div>
    );
  }
}
