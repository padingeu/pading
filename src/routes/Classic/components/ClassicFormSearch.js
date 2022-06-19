import React from 'react';
import { withTranslation } from 'react-i18next';
import { format } from 'date-fns';
import ClassicFormSearchScreen from './ClassicFormSearchScreen';
import './_ClassicFormSearch.scss';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
var lodash = require('lodash');

class ClassicFormSearch extends React.Component {
  state = {
    citiesFrom: this.props.searchData ? this.props.searchData.cities : [],
    address: '',
    displayFromWhereScreen: false,
    displayTravelersScreen: false,
    displayDatesPicker: false,
    dateFrom: this.props.dateFrom,
    dateTo: this.props.dateTo,
    showFilter: false,
    showDateFrom: false,
    showDateTo: false,
    returnTrip: true,
    directTrip: false,
    flexibleTrip: false,
    displayFullFormSearchResults: false,
    FormSearchisOpen: true,
  };

  search = () => {
    console.log(this.props);
    this.props.searchClassicTrips(
      this.state.citiesFrom,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.directTrip,
      this.state.returnTrip,
      this.state.flexibleTrip
    );
    window.gtag('event', 'search trip', {
      event_category: format(this.state.dateFrom, 'dd/MM/yyyy'),
      event_label: this.state.citiesFrom
        .map(function (city) {
          return city['name'];
        })
        .toString(),
      value: '',
    });
    this.setState({ displayDatesPicker: false });
    document.querySelector('.overlay').style.display = 'none';
    const body = document.querySelector('body');
    body.style.overflow = 'scroll';
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

    const input = document.querySelector('.classic-city-departure-input');
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

  handleClickOutside = () => {
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: false });
    document.querySelector('.overlay').style.display = 'none';
    const body = document.querySelector('body');
    body.style.overflow = 'scroll';
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
    this.setState({ displayFromWhereScreen: true });
    document.querySelector('.overlay').style.display = 'block';
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  };

  openfullFormSearchResults = (event) => {
    event.preventDefault();
    this.setState({ displayfullFormSearchResults: !this.state.displayFormSearchResults });
  };

  goToHomePage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    document.querySelector('.overlay').style.display = 'none';
    const body = document.querySelector('body');
    body.style.overflow = 'scroll';
  };

  goToResultsPage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: false });
    document.querySelector('.overlay').style.display = 'none';
    const body = document.querySelector('body');
    body.style.overflow = 'scroll';
  };

  goToFromWherePage = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayFromWhereScreen: true });
  };

  startFromWherePage = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayFromWhereScreen: true });
    document.querySelector('.overlay').style.display = 'block';
  };

  goToTravelersPage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayTravelersScreen: true });
  };

  startFromTravelersPage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayTravelersScreen: true });
    document.querySelector('.overlay').style.display = 'block';
  };

  goToDatesPicker = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDetailsScreen: false });
    this.setState({ displayDatesPicker: true });
  };

  startFromDatesPicker = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDetailsScreen: false });
    this.setState({ displayDatesPicker: true });
    document.querySelector('.overlay').style.display = 'block';
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
      const cities = [...this.state.citiesFrom];
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
        {this.props.isClassicSearchPage ? (
          <button className="start-search-btn" onClick={(event) => this.startPlanningTrip(event)}>
            <span>{this.props.t('startSearch')}</span>
          </button>
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
              <span>{this.props.t('fromwhereInput')}</span>
            </button>

            {this.state.displayfullFormSearchResults ? (
              <div className="formsearch-results">
                <div className="formsearch-bar-results-edit">
                  <button
                    className="fromwhere-btn"
                    onClick={(event) => this.startPlanningTrip(event)}
                  >
                    <span>
                      {this.props.isLoading ? (
                        <div className="formsearch-skeleton"></div>
                      ) : lodash.sum(Object.values(this.props.searchData.travelers)) < 3 ? (
                        `From ${Object.keys(this.props.searchData.travelers).join(' and ')}`
                      ) : (
                        `From ${Object.keys(this.props.searchData.travelers).join(', ')}`
                      )}
                    </span>
                  </button>
                </div>
                <div className="formsearch-bar-results-edit-2">
                  <button
                    className="formsearch-bar-dates-btn"
                    onClick={(event) => this.startFromDatesPicker(event)}
                  >
                    {this.props.isLoading ? (
                      <div className="formsearch-skeleton"></div>
                    ) : (
                      <div>
                        <i className="far fa-calendar-alt"></i>
                        {this.props.searchData.returnTrip
                          ? `${format(this.props.searchData.dateFrom, 'dd/MM/yyyy')} - ${format(
                              this.props.searchData.dateTo,
                              'dd/MM/yyyy'
                            )}`
                          : `${format(this.props.searchData.dateFrom, 'dd/MM/yyyy')} - no return`}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={(event) => this.startFromTravelersPage(event)}
                    className="formsearch-bar-travelers-btn"
                  >
                    {this.props.isLoading ? (
                      <div className="formsearch-skeleton"></div>
                    ) : (
                      <div>
                        <i className="far fa-user"></i>
                        {this.props.searchData &&
                          `${lodash.sum(
                            Object.values(this.props.searchData.travelers)
                          )} ${this.props.t('travelers')}`}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
        <ClassicFormSearchScreen
          displayFullFormSearchResults={this.state.displayfullFormSearchResults}
          displayFromWhereScreen={this.state.displayFromWhereScreen}
          goToFromWherePage={this.goToFromWherePage}
          isClassicSearchPage={this.props.isClassicSearchPage}
          goToHome={this.goToHomePage}
          goToResultsPage={this.goToResultsPage}
          address={this.state.address}
          cities={this.state.citiesFrom}
          addCity={this.addCity}
          removeCity={this.removeCity}
          handleAddressChange={this.handleAddressChange}
          displayTravelersScreen={this.state.displayTravelersScreen}
          goToTravelersPage={this.goToTravelersPage}
          citiesFrom={this.state.citiesFrom}
          addTraveler={this.addTraveler}
          removeTraveler={this.removeTraveler}
          switchOneWayReturn={this.switchOneWayReturn}
          returnTrip={this.state.returnTrip}
          displayDatesPicker={this.state.displayDatesPicker}
          goToDatesPicker={this.goToDatesPicker}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          onInputDateChange={this.onInputDateChange}
          displayDetailsScreen={this.state.displayDetailsScreen}
          goToDetailsPage={this.goToDetailsPage}
          switchToDirect={this.switchToDirect}
          directTrip={this.state.directTrip}
          switchToFlexibleTrip={this.props.switchToFlexibleTrip}
          search={this.search}
          handleClickOutside={this.handleClickOutside}
        />
      </div>
    );
  }
}

export default withTranslation()(ClassicFormSearch);
