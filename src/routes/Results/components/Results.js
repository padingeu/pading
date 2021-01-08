import React from 'react';
import Map from '../../../components/Map';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import TripCard from './TripCard';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Results extends React.Component {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    showMobileFormSearch: false,
    showMobileResults: true,
    activeMapView: false,
    citiesFrom: this.props.search.cities,
    address: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this._handleWindowResize);

    if (!this.props.search.isLoading && !this.props.search.success) {
    }
  }

  _handleWindowResize = () => {
    this.setState({ windowWidth: window.innerWidth });
    this.setState({ windowHeight: window.innerHeight });
  };

  displayMobileFormSearch = (event) => {
    event.preventDefault();
    this.setState({ showMobileFormSearch: !this.state.showMobileFormSearch });
    this.setState({ showMobileResults: !this.state.showMobileResults });
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

  switchViewType = (event) => {
    event.preventDefault();
    this.setState({ activeMapView: !this.state.activeMapView });
  };

  render() {
    return (
      <div>
        <NavBar />

        <div>
          {window.innerWidth < 1200 ? (
            <div className="travel-results">
              {this.state.showMobileFormSearch ? (
                <div className="formsearch-mobile">
                  <i
                    className="fas fa-times-circle close-formsearch fa-3x"
                    onClick={this.displayMobileFormSearch}
                  />
                  <FormSearch
                    searchTrips={this.props.searchTrips}
                    isLoading={this.props.search.isLoading}
                    dateFrom={this.props.search.dateFrom}
                    dateTo={this.props.search.dateTo}
                    citiesFrom={this.props.search.cities}
                    addCity={this.addCity}
                    removeCity={this.removeCity}
                    handleAddressChange={this.handleAddressChange}
                    address={this.state.address}
                  />
                </div>
              ) : (
                <div className="cards-map-results">
                  <div className="linear-progress-edit-view">
                    <div className="linear-progress-div">
                      {this.props.search.isLoading && (
                        <div className="linear-progress">
                          <LinearProgress />
                        </div>
                      )}
                    </div>
                    <div className="edit-div">
                      <button className="btn-edit-search" onClick={this.displayMobileFormSearch}>
                        Edit
                      </button>
                      <button className="btn-edit-view" onClick={this.switchViewType}>
                        {this.state.activeMapView ? 'cities' : 'map'}
                      </button>
                      <button className="btn-edit-filter">Filter</button>
                    </div>
                  </div>

                  {this.state.activeMapView ? (
                    <div className="map">
                      <Map
                        citiesFrom={this.props.search.cities}
                        citiesTo={this.getDestinationsWithPrices(
                          this.props.search.trips,
                          this.props.search.commonDestinations
                        )}
                      />
                    </div>
                  ) : (
                    <div>
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
                              <div key={index}>
                                <TripCard
                                  destination={destination}
                                  prices={this.getTotalPrice(this.props.search.trips, destination)}
                                  travelers={this.props.search.travelers}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="travel-results">
              <div className="formsearch">
                <FormSearch
                  searchTrips={this.props.searchTrips}
                  isLoading={this.props.search.isLoading}
                  dateFrom={this.props.search.dateFrom}
                  dateTo={this.props.search.dateTo}
                  citiesFrom={this.state.citiesFrom}
                  addCity={this.addCity}
                  removeCity={this.removeCity}
                  handleAddressChange={this.handleAddressChange}
                  address={this.state.address}
                />
              </div>

              <div className="cards-map-results">
                <div className="linear-progress-edit-view">
                  <div className="linear-progress-div">
                    {this.props.search.isLoading && (
                      <div className="linear-progress">
                        <LinearProgress />
                      </div>
                    )}
                  </div>
                  <div className="edit-div">
                    <button className="btn-edit-search" onClick={this.displayMobileFormSearch}>
                      Edit
                    </button>
                    <button className="btn-edit-view" onClick={this.switchViewType}>
                      {this.state.activeMapView ? 'cities' : 'map'}
                    </button>
                    <button className="btn-edit-filter">Filter</button>
                  </div>
                </div>

                {this.state.activeMapView ? (
                  <div className="map">
                    <Map
                      citiesFrom={this.props.search.cities}
                      citiesTo={this.getDestinationsWithPrices(
                        this.props.search.trips,
                        this.props.search.commonDestinations
                      )}
                    />
                  </div>
                ) : (
                  <div>
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
                            <div className={index}>
                              <Popup
                                modal
                                trigger={
                                  <div>
                                    <TripCard
                                      destination={destination}
                                      prices={this.getTotalPrice(
                                        this.props.search.trips,
                                        destination
                                      )}
                                      travelers={this.props.search.travelers}
                                    />
                                  </div>
                                }
                              >
                                <DetailsResultsPopup destination={destination} />
                              </Popup>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
