import React from 'react';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import SelectedCities from './SelectedCities';
import './_FormSearch.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class FormSearch extends React.Component {
  state = {
    dateFrom: this.props.dateFrom,
    dateTo: this.props.dateTo,
    showDateFrom: false,
    showDateTo: false,
    travelType: 'Return',
    stopTrip: 'All',
    plane: true,
    shouldSearch: false,
  };

  search = () => {
    this.props.searchTrips(
      this.props.citiesFrom,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.stopTrip
    );
    this.scrollDown()
  };

  scrollDown() {
    document.scrollingElement.scrollTo({
      top: 750,
      behavior: 'smooth'
    })
  }

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

  addTraveler = (event, city) => {
    event.preventDefault();
    const cities = [...this.props.citiesFrom];
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
      <div className="travel-form">
        <div className="search-box">
          <DatesPicker
            dateFrom={this.state.dateFrom}
            dateTo={this.state.dateTo}
            showDateFrom={true}
            showDateTo={true}
            onChange={this.onInputDateChange}
            switchToOneWay={this.switchToOneWay}
            switchToReturn={this.switchToReturn}
            switchToIndirect={this.switchToIndirect}
            switchToDirect={this.switchToDirect}
            travelType={this.state.travelType}
            stopTrip={this.state.stopTrip}
          />
        </div>

        <LocationSearchInput
          address={this.props.address}
          cities={this.props.citiesFrom}
          addCity={this.props.addCity}
          removeCity={this.props.removeCity}
          handleAddressChange={this.props.handleAddressChange}
        />

        <SelectedCities
          cities={this.props.citiesFrom}
          addCity={this.props.addCity}
          removeCity={this.props.removeCity}
          handleCityClick={this.showButtons}
          addTraveler={this.addTraveler}
          removeTraveler={this.removeTraveler}
          address={this.props.address}
        />

        <button
          className="btn btn-flat"
          name="button"
          disabled={!(this.state.dateFrom && this.props.citiesFrom.length > 0)}
          type="submit"
          onClick={() => this.search()}
        >
          {this.props.isLoading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <div>
              <h4>Explore</h4>
            </div>
          )}
        </button>
      </div>
    );
  }
}
