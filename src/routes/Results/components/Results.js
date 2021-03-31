import React from 'react';
import NavBar from '../../../components/NavBar';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import TripCard from './TripCard';
import Filter from './Filter';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Results extends React.Component {
  state = {
    citiesFrom: this.props.search.cities,
    address: '',
    showFilter: false,
  };

  displayFilter = () => {
      this.setState({ showFilter: !this.state.showFilter });
  };

  getPriceForDestination = (trips, destination, city) => {
    let tripsForDestination = trips[city].filter((trip) => {
      return trip.cityTo === destination;
    });
    let prices = tripsForDestination.map((trip) => {
      return trip.price;
    });
    return Math.min.apply(null, prices);
  };

  getTotalPrice = (trips, destination) => {
    const pricesList = [];
    let totalPrice = 0;
    Object.keys(trips).forEach((city) => {
      const price = this.getPriceForDestination(trips, destination, city);
      totalPrice += price;
      pricesList.push({ city: city, price: price });
    });

    return {
      pricesPerDestination: pricesList,
      totalPrice: totalPrice,
    };
  };

  getDestinationsWithPrices = (trips, commonDestinations) => {
    const destinations = [];
    commonDestinations.forEach((destinationName) => {
      let totalPrice = this.getTotalPrice(trips, destinationName);
      destinations.push({
        cityName: destinationName,
        totalPrice: totalPrice,
      });
    });
    return destinations;
  };

  getFormattedCoordinate = (coordinates) => {
    coordinates.lat = coordinates.lat.toFixed(6);
    coordinates.lng = coordinates.lng.toFixed(6);
    return `${coordinates.lat}-${coordinates.lng}-50km`;
  };

  findCityIndex = (cityName, cities) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name === cityName) {
        return i;
      }
    }
    return -1;
  };

  handleAddressChange = (address) => {
    this.setState({
      address: address,
    });

    const input = document.querySelector('.city-departure-input');
    input.addEventListener(
      'keydown',
      (event) => {
        const places = Array.from(
          event.target.parentElement.querySelectorAll('div[role="option"]')
        ).map((e) => e.innerText.trim().toLocaleLowerCase());

        if (event.key === 'Enter' && !places.includes(input.value.toLocaleLowerCase())) {
          if (0 < places.length) {
            input.value = places[0];
            this.setState({ address: places[0] });
          } else {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      },
      true
    );
  };

  addCity = async (address) => {
    const position = await geocodeByAddress(address);
    const coordinates = await getLatLng(position[0]);
    const coordinatesFormatted = this.getFormattedCoordinate(coordinates);
    const cityName = position[0].address_components[0].long_name;
    const cities = [...this.state.citiesFrom];
    const cityIndex = this.findCityIndex(cityName, cities);

    if (cityIndex === -1) {
      //CREATE new city
      cities.push({
        name: cityName,
        lat: coordinates.lat,
        lng: coordinates.lng,
        coordinates: coordinatesFormatted,
        numberOfPeople: 1,
        showButton: false,
      });
    } else {
      //Add traveler
      cities[cityIndex].numberOfPeople++;
    }
    this.setState({
      citiesFrom: cities,
      address: '',
    });
  };

  removeCity = (event, index) => {
    event.preventDefault();
    const citiesFrom = [...this.state.citiesFrom];
    citiesFrom.splice(index, 1);
    this.setState({ citiesFrom });
  };

  render() {
    return (
      <div>
        <NavBar
          isLoading={this.props.search.isLoading}
          searchTrips={this.props.searchTrips}
        />
        <div className="travel-results">
          <div className="travel-results-cards">
            <div className="linear-progress-filter">
              <div className="linear-progress-div">
                {this.props.search.isLoading && (
                  <div className="linear-progress">
                    <LinearProgress />
                  </div>
                )}
              </div>
              <button
                className="btn-filter"
                onClick={this.displayFilter}
              >
                Filter
              </button>
              <i className="fas fa-sort-amount-down-alt fa-lg"></i>
            </div>
            {this.state.showFilter ? (
              <div className="filter-div">
                <div className="filter-table">
                  <div className="filter-table-header">
                    <div className="filter-table-header-city"></div>
                    <div className="filter-table-header-departure">
                      <p>Departure time</p>
                    </div>
                    {this.props.search.travelType === "Return" ? (
                      <div className="filter-table-header-return">
                        <p>Return time</p>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
             
                  <div className="filter-table-body">                
                    {this.props.search.cities.map((city, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="filter-table-body-city">
                            <p>{city.name}</p>
                          </div>
                          <div className="filter-table-body-departure">
                            <Filter
                            />
                          </div>
                          {this.props.search.travelType === "Return" ? (
                            <div className="filter-table-body-return">
                              <Filter />
                            </div>
                          ) : (
                            ''
                          )}
                      </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div id="cards-results-wrapper">
              {this.props.search.isLoading ? (
                <div className="cards-results">
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                  <TripCardSkeleton />
                </div>
              ) : (
                <div className="cards-results">
                  {this.props.search.commonDestinations.map((destination, index) => {
                    return (
                      <div className={index} key={index}>
                        <Popup
                          modal
                          trigger={
                            <div>
                              <TripCard
                                destination={destination}
                                prices={this.getTotalPrice(this.props.search.trips, destination)}
                                travelers={this.props.search.travelers}
                                key={index}
                              />
                            </div>
                          }
                          key={index}
                        >
                          <DetailsResultsPopup
                            destination={destination}
                            trips={this.props.search.trips}
                            key={index}
                          />
                        </Popup>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
