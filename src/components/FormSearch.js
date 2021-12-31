import React from 'react';
import { format } from 'date-fns';
import FormSearchScreen from './FormSearchScreen';
import './_FormSearch.scss';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
var lodash = require('lodash');

export default class FormSearch extends React.Component {
  state = {
    citiesFrom: this.props.searchData ? this.props.searchData.cities : [],
    address: '',
    returnTrip: true,
    displayFromWhereScreen: false,
    isFromWherePageFirst: false,
    displayTravelersScreen: false,
    isTravelersPageFirstPage: false,
    displayDatesPicker: false,
    isDatesPickerFirstPage: false,
    displayDetailsScreen: false,
    dateFrom: this.props.dateFrom,
    dateTo: this.props.dateTo,
    showFilter: false,
    showDateFrom: false,
    showDateTo: false,
    directTrip: false,
    flexibleTrip: false,
    displayFullFormSearchResults: false,
    FormSearchisOpen: true,
  };

  scrollDown() {
    setTimeout(
      () => document.querySelector('.travel-results').scrollIntoView({ behavior: 'smooth' }),
      150
    );
  }

  search = () => {
    this.props.searchTrips(
      this.state.citiesFrom,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.directTrip,
      this.state.returnTrip,
      this.state.flexibleTrip
    );
    this.scrollDown();
    window.gtag('event', 'search trip', {
      event_category: format(this.state.dateFrom, 'dd/MM/yyyy'),
      event_label: this.state.citiesFrom
        .map(function (city) {
          return city['name'];
        })
        .toString(),
      value: '',
    });
    this.setState({ displayDetailsScreen: false });
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

  handleClickOutside = (event) => {
    this.setState({ displayFromWhereScreen: false });
    this.setState({ isTravelersPageFirstPage: false });
    this.setState({ isDatesPickerFirstPage: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: false });
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

  switchOneWayReturn = (event) => {
    event.preventDefault();
    this.setState({ returnTrip: !this.state.returnTrip });
  };

  startPlanningTrip = (event) => {
    event.preventDefault();
    this.setState({ isFromWherePageFirst: true });
    this.setState({ displayFromWhereScreen: true });
  };

  openfullFormSearchResults = (event) => {
    event.preventDefault();
    this.setState({ displayfullFormSearchResults: !this.state.displayFormSearchResults });
  };

  goToHomePage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
  };

  goToResultsPage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: false });
  };

  goToFromWherePage = (event) => {
    event.preventDefault();
    this.setState({ isFromWherePageFirst: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayFromWhereScreen: true });
  };

  startFromWherePage = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayFromWhereScreen: true });
  };

  goToTravelersPage = (event) => {
    event.preventDefault();
    this.setState({ isTravelersPageFirstPage: false });
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayTravelersScreen: true });
  };

  startFromTravelersPage = (event) => {
    event.preventDefault();
    this.setState({ isTravelersPageFirstPage: true });
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayTravelersScreen: true });
  };

  goToDatesPicker = (event) => {
    event.preventDefault();
    this.setState({ isDatesPickerFirstPage: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDetailsScreen: false });
    this.setState({ displayDatesPicker: true });
  };

  startFromDatesPicker = (event) => {
    event.preventDefault();
    this.setState({ isDatesPickerFirstPage: true });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDetailsScreen: false });
    this.setState({ displayDatesPicker: true });
  };

  goToDetailsPage = (event) => {
    event.preventDefault();
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: true });
  };

  displayFilter = (event) => {
    event.preventDefault();
    this.setState({ showFilter: !this.state.showFilter });
  };

  onInputDateChange = (date) => {
    this.setState({ showDateFrom: true });
    this.setState({ showDateTo: true });
    this.setState({ dateFrom: date[0] });
    this.setState({ dateTo: date[1] });
  };

  switchToDirect = (event) => {
    event.preventDefault();
    this.setState({ directTrip: !this.state.directTrip });
  };

  switchToFlexibleTrip = (event) => {
    event.preventDefault();
    this.setState({ flexibleTrip: !this.state.flexibleTrip });
  };

  addTraveler = (event, city) => {
    event.preventDefault();
    const cities = [...this.state.citiesFrom];
    cities[cities.findIndex((el) => el === city)] = city;
    city.numberOfPeople++;
    this.setState({
      cities: cities,
    });
  };

  removeTraveler = (event, city) => {
    event.preventDefault();
    if (city.numberOfPeople >= 2) {
      const cities = [...this.state.cities];
      cities[cities.findIndex((el) => el === city)] = city;
      city.numberOfPeople--;
      this.setState({
        cities: cities,
      });
    }
  };

  render() {
    return (
      <div className="formsearch">
        {this.props.isHomePage ? (
          <div className="formsearch-bar-home">
            <button className="fromwhere-btn" onClick={(event) => this.startPlanningTrip(event)}>
              <span>From where do you travel ?</span>
            </button>
            <button
              className="traveltype-btn"
              onClick={(event) => {
                this.switchOneWayReturn(event);
              }}
            >
              {this.state.returnTrip ? 'Return trip' : 'One-way'}
            </button>
          </div>
        ) : (
          <div className="formsearch-bar-results">
            <button
              className="fromwhere-btn"
              onClick={
                lodash.sum(Object.values(this.props.searchData.travelers)) > 1
                  ? (event) => this.openfullFormSearchResults(event)
                  : (event) => this.startPlanningTrip(event)
              }
            >
              <span>From where do you travel ?</span>
            </button>
            <button
              className="traveltype-btn"
              onClick={(event) => {
                this.switchOneWayReturn(event);
              }}
            >
              {this.state.returnTrip ? 'Return trip' : 'One-way'}
            </button>
          </div>
        )}

        {this.state.displayfullFormSearchResults ? (
          <div className="formsearch-results">
            <div className="formsearch-bar-results">
              <button className="fromwhere-btn" onClick={(event) => this.startPlanningTrip(event)}>
                <span>{this.props.isLoading ? <div className="formsearch-skeleton"></div> : `From ${Object.keys(this.props.searchData.travelers).join(', ')}`}</span>
              </button>
              <button
                className="traveltype-btn"
                onClick={(event) => {
                  this.switchOneWayReturn(event);
                  this.startFromDatesPicker(event);
                }}
              >
                {this.state.returnTrip ? 'Return' : 'One-way'}
              </button>
            </div>
            <div className="formsearch-bar-results-2">
              <button
                className="formsearch-bar-results-2-btn dates-btn"
                onClick={(event) => this.startFromDatesPicker(event)}
              >
               
                {this.props.isLoading ? <div className="formsearch-skeleton"></div> :
                  <div>
                    <i class="far fa-calendar-alt"></i>
                    {this.props.searchData.returnTrip ?
                      `${format(this.props.searchData.dateFrom, 'dd/MM/yyyy')} - ${format(
                        this.props.searchData.dateTo,
                        'dd/MM/yyyy'
                      )}`
                    : `${format(this.props.searchData.dateFrom, 'dd/MM/yyyy')} - no return`}
                  </div>
                }
              </button>
              <button
                onClick={(event) => this.startFromTravelersPage(event)}
                className="formsearch-bar-results-2-btn travelers-btn"
              >
                {this.props.isLoading ? <div className="formsearch-skeleton"></div> :
                  <div>
                    <i class="far fa-user"></i>
                    {this.props.searchData &&
                      `${lodash.sum(Object.values(this.props.searchData.travelers))} 
                    travelers`}
                  </div>
                }
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        <FormSearchScreen
          displayFromWhereScreen={this.state.displayFromWhereScreen}
          goToFromWherePage={this.goToFromWherePage}
          isFromWherePageFirst={this.state.isFromWherePageFirst}
          isHomePage={this.state.isHomePage}
          goToHome={this.goToHomePage}
          goToResultsPage={this.goToResultsPage}
          address={this.state.address}
          cities={this.state.citiesFrom}
          addCity={this.addCity}
          removeCity={this.removeCity}
          handleAddressChange={this.handleAddressChange}
          displayTravelersScreen={this.state.displayTravelersScreen}
          goToTravelersPage={this.goToTravelersPage}
          isTravelersPageFirstPage={this.state.isTravelersPageFirstPage}
          citiesFrom={this.state.citiesFrom}
          addTraveler={this.addTraveler}
          removeTraveler={this.removeTraveler}
          displayDatesPicker={this.state.displayDatesPicker}
          goToDatesPicker={this.goToDatesPicker}
          isDatesPickerFirstPage={this.state.isDatesPickerFirstPage}
          returnTrip={this.state.returnTrip}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          onInputDateChange={this.onInputDateChange}
          displayDetailsScreen={this.state.displayDetailsScreen}
          goToDetailsPage={this.goToDetailsPage}
          switchToDirect={this.switchToDirect}
          switchToFlexibleTrip={this.props.switchToFlexibleTrip}
          directTrip={this.state.directTrip}
          search={this.search}
          handleClickOutside={this.handleClickOutside}
        />
      </div>
    );
  }
}
