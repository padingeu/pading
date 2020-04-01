import React from 'react';
import TripCard from './TripCard';
import Map from './Map';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Results extends React.Component {
  state = {
    isHomePage: false,
    visible: 8
  };

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

  loadMore = event => {
    event.preventDefault();
    this.setState({ visible: this.state.visible + 4 });
  };

  render() {
    console.log('cities')
    console.log(this.props.search.cities);
    return (
      <div>
        <NavBar />
        <div className="travel-results">
          <div className="formsearch-results">
            <FormSearch
              searchTrips={this.props.searchTrips}
              dateFrom={this.props.search.dateFrom}
              dateTo={this.props.search.dateTo}
            />
          </div>
          <div className="cards-map-results">
            <div className="linear-progress">
              <LinearProgress />
            </div>
            <div className="cards-results">
              {this.props.search.commonDestinations
                .slice(0, this.state.visible)
                .map((destination, index) => {
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
            {this.state.visible >= this.props.search.commonDestinations.length ? null : (
              <button type="button" id="loadmore-btn" onClick={this.loadMore}>
                Load more
              </button>
            )}
            <div className="map-results">
              <Map />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
