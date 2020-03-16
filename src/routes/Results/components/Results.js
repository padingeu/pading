import React from 'react';
import NavBar from './NavBar';
import TripCard from './TripCard';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Result extends React.Component {
  state = {};

  getTotalPrice = (trips, destination) => {
    const prices_list = [];
    Object.keys(trips).forEach((city, index) => {
      let tripsForDestination = trips[city].filter(trip => {
        return trip.cityTo === destination;
      });
      let prices = tripsForDestination.map(trip => {
        return trip.price;
      });
      const price = Math.min.apply(null, prices);

      prices_list.push({ city: city, price: price });
    });

    return prices_list;
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="travel-results">
          <div className="formsearch-results">
          </div>
          <div className="cards-map-results">
            <div className="cards-results">
              <LinearProgress/>
                {!this.props.search.commonDestinations &&
                  <p>
                    Loading...
                  </p>
                }
                {this.props.search.commonDestinations.map((destination, index) => {
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
                })}
              </div>
              <div className="map-results">
              </div>
          </div>
        </div>
      </div>
    );
  }
}
