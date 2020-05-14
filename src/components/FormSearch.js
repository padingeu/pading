import React from 'react';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import SelectedCities from './SelectedCities';
import './_FormSearch.scss';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Switch from '@material-ui/core/Switch';

export default class FormSearch extends React.Component {
  state = {
    dateFrom: this.props.dateFrom,
    dateTo: this.props.dateTo,
    showDateFrom: false,
    showDateTo: false,
    travelType: 'Return',
    stopTrip: 'All',
    //flexibleDates: 0,
    plane: true,
    train: true,
    bus: true,
    cities: this.props.cities || [],
    address: '',
    shouldSearch: false,
    onlyDepartureCitiesSearch: false,
  };

  search = () => {
    this.props.searchTrips(
      this.state.cities,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.stopTrip
    );
  };

  onInputDateChange = (date) => {
    this.setState({ showDateFrom: true });
    this.setState({ showDateTo: true });
    this.setState({ dateFrom: date[0] });
    this.setState({ dateTo: date[1] });
  };

  switchToOneWay = (event) => {
    event.preventDefault();
    this.setState({ travelType: 'One-way' });
  };

  switchToReturn = (event) => {
    event.preventDefault();
    this.setState({ showDateTo: false });
    this.setState({ travelType: 'Return' });
  };

  switchToIndirect = (event) => {
    event.preventDefault();
    this.setState({ stopTrip: 'All' });
  };

  switchToDirect = (event) => {
    event.preventDefault();

    this.setState({ stopTrip: 'Direct' });
  };

  /*changeFlexibleDates = event => {
    event.preventDefault();
  this.setState({ flexibleDates: event.target.value });*/

  getFormattedCoordinate = (coordinates) => {
    coordinates.lat = coordinates.lat.toFixed(6);
    coordinates.lng = coordinates.lng.toFixed(6);
    return `${coordinates.lat}-${coordinates.lng}-50km`;
  };

  addCity = async (address) => {
    const position = await geocodeByAddress(address);
    const coordinates = await getLatLng(position[0]);
    const coordinatesFormatted = this.getFormattedCoordinate(coordinates);
    const cityName = position[0].address_components[0].long_name;
    const cities = [...this.state.cities];
    const cityIndex = this.findCityIndex(cityName, cities);

    if (cityIndex === -1) {
      //CREATE new city
      const city_obj = {
        name: cityName,
        lat: coordinates.lat,
        lng: coordinates.lng,
        coordinates: coordinatesFormatted,
        numberOfPeople: 1,
        showButton: false,
      };
      cities.push(city_obj);
    } else {
      //Add traveler
      cities[cityIndex].numberOfPeople++;
    }
    this.setState({
      coordinates: coordinates,
      cities: cities,
      address: '',
    });
  };

  findCityIndex = (cityName, cities) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name === cityName) {
        return i;
      }
    }
    return -1;
  };

  showButtons = (event, city) => {
    event.preventDefault();
    city.showButton = !city.showButton;
    const cities = [...this.state.cities];
    cities[cities.findIndex((el) => el === city)] = city;
    this.setState({
      cities: cities,
    });
  };

  addTraveler = (event, city) => {
    event.preventDefault();
    city.numberOfPeople++;
    const cities = [...this.state.cities];
    cities[cities.findIndex((el) => el === city)] = city;
    this.setState({
      cities: cities,
    });
  };

  removeTraveler = (event, city) => {
    event.preventDefault();
    if (city.numberOfPeople >= 2) {
      city.numberOfPeople--;
      const cities = [...this.state.cities];
      cities[cities.findIndex((el) => el === city)] = city;
      this.setState({
        cities: cities,
      });
    }
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

  removeCity = (event, index) => {
    event.preventDefault();
    const cities = [...this.state.cities];
    cities.splice(index, 1);
    this.setState({ cities });
  };

  onPlaneClick = () => {
    this.setState({ plane: !this.state.plane });
  };

  onTrainClick = () => {
    this.setState({ train: !this.state.train });
  };

  onBusClick = () => {
    this.setState({ bus: !this.state.bus });
  };

  switchSearchBtn = () => {
    this.setState({
      onlyDepartureCitiesSearch: !this.state.onlyDepartureCitiesSearch,
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div className={this.props.isHomePage ? 'travel-form' : 'travel-form-results'}>
          <div className={this.props.isHomePage ? 'search-box' : 'search-box-results'}>
            <DatesPicker
              dateFrom={this.state.dateFrom}
              dateTo={this.state.dateTo}
              showDateFrom={this.state.showDateFrom || !this.props.isHomePage}
              showDateTo={this.state.showDateTo || !this.props.isHomePage}
              onChange={this.onInputDateChange}
              switchToOneWay={this.switchToOneWay}
              switchToReturn={this.switchToReturn}
              switchToIndirect={this.switchToIndirect}
              switchToDirect={this.switchToDirect}
              //changeFlexibleDates={this.changeFlexibleDates}
              travelType={this.state.travelType}
              stopTrip={this.state.stopTrip}
              //flexibleDates={this.state.flexibleDates}
              isHomePage={this.props.isHomePage}
            />

            <button
              className={this.props.isHomePage ? 'btn btn-flat' : 'btn btn-flat-results'}
              name="button"
              disabled={!(this.state.dateFrom && this.state.cities.length > 0)}
              type="submit"
              onClick={() => this.search()}
            >
              Explore
            </button>
          </div>

          {/*<div className="switch-search-type">
            <p>We only consider to meet in one of the cities we come from</p>
            <Switch
              onChange={this.switchSearchBtn}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>*/}
          <LocationSearchInput
            address={this.state.address}
            cities={this.state.cities}
            addCity={this.addCity}
            removeCity={this.removeCity}
            handleAddressChange={this.handleAddressChange}
          />
          <SelectedCities
            cities={this.state.cities}
            addCity={this.addCity}
            removeCity={this.removeCity}
            handleCityClick={this.showButtons}
            addTraveler={this.addTraveler}
            removeTraveler={this.removeTraveler}
            address={this.state.address}
          />
        </div>
      </div>
    );
  }
}
