import React from 'react';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import '../components/_FormSearch.scss';
import { Label, FormGroup } from 'reactstrap';
import {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
export default class FormSearch extends React.Component {

  state = {
    dateFrom: '',
    dateTo: '',
    showDateFrom: false,
    showDateTo: false,
    travelType: "return",
    plane: true,
    train: true,
    bus: true,
    cities: [],
    address: ''
  };

  onInputDateChange = date => {
    this.setState({ showDateFrom: true });
    this.setState({ showDateTo: true });
    this.setState({ dateFrom: date[0] });
    this.setState({ dateTo: date[1] });
  };

  switchToOneWay = event => {
    event.preventDefault();
    this.setState({ travelType: "one-way" });
  }

  switchToReturn = event => {
    event.preventDefault();
    this.setState({ showDateTo: false });
    this.setState({ travelType: "return" });
  }

  getFormattedCoordinate = (coordinates) => {
    coordinates.lat = coordinates.lat.toFixed(6)
    coordinates.lng = coordinates.lng.toFixed(6)
    return `${coordinates.lat}-${coordinates.lng}-20km`
  }

  addCity = async address => {
    const position = await geocodeByAddress(address);
    const coordinates = await getLatLng(position[0]);
    const coordinatesFormatted = this.getFormattedCoordinate(coordinates);
    const city = position[0].address_components[0].long_name
    const city_obj = {
      name: city,
      coordinates: coordinatesFormatted,
      numberOfPeople: 1,
      showButton: false
    }

    this.setState(
      {
        coordinates: coordinates,
        cities: [...this.state.cities, city_obj],
        address: ''
      })
  };

  showButtons = (event, city) => {
    event.preventDefault();
    city.showButton = !city.showButton
    const cities = [...this.state.cities];
    cities[cities.findIndex(el => el === city)] = city;
    this.setState(
      {
        cities: cities
      })
  };

  addTraveler = (event, city) => {
    event.preventDefault();
    city.numberOfPeople++;
    const cities = [...this.state.cities];
    cities[cities.findIndex(el => el === city)] = city;
    this.setState(
      {
        cities: cities
      })
  }

  removeTraveler = (event, city) => {
    event.preventDefault();
    if (city.numberOfPeople >= 2) {
      city.numberOfPeople--;
      const cities = [...this.state.cities];
      cities[cities.findIndex(el => el === city)] = city;
      this.setState(
        {
          cities: cities
        })
    }
  }

  handleAddressChange = (address) => {
    this.setState({ address });
    const input = document.querySelector('.city-departure-input');
    input.addEventListener("keydown", (event) => {
      const places =
        Array.from(event.target.parentElement.querySelectorAll('div[role="option"]'))
          .map(e => e.innerText.trim().toLocaleLowerCase());
      if (event.key === 'Enter' && !places.includes(input.value.toLocaleLowerCase())) {
        if (0 < places.length) {
          input.value = places[0];
          this.setState({ address: places[0] });
          debugger;
        } else {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    }, true);
  };

  removeCity = (event, index) => {
    event.preventDefault();
    const cities = this.state.cities.slice(0)
    cities.splice(index, 1);
    this.setState({ cities });
  };

  onPlaneClick = () => {
    this.setState({ plane: !this.state.plane })
  }

  onTrainClick = () => {
    this.setState({ train: !this.state.train })
  }

  onBusClick = () => {
    this.setState({ bus: !this.state.bus })
  }

  render() {
    return (
      <div className="travel-form">
       <DatesPicker
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          showDateFrom={this.state.showDateFrom}
          showDateTo={this.state.showDateTo}
          onChange={this.onInputDateChange}
          switchToOneWay={this.switchToOneWay}
          switchToReturn={this.switchToReturn}
          travelType={this.state.travelType}
        />
        <FormGroup check className="travel-checkbox">
          <Label check>
            <div className="vehicle-type">
              <h5>Flight</h5>
              <button
                className="toggle-btn"
                onClick={this.onPlaneClick}
              >
                {this.state.plane ? <i className="fas fa-toggle-on fa-2x"></i> : <i className="fas fa-toggle-off fa-2x"></i>}
              </button>
            </div>
          </Label>
          <Label check>
            <div className="vehicle-type">
              <h5>Train</h5>
              <button
                className="toggle-btn"
                onClick={this.onTrainClick}
              >
                {this.state.train ? <i className="fas fa-toggle-on fa-2x"></i> : <i className="fas fa-toggle-off fa-2x"></i>}
              </button>
            </div>
          </Label>
          <Label check>
            <div className="vehicle-type">
              <h5>Bus</h5>
              <button
                className="toggle-btn"
                onClick={this.onBusClick}
              >
                {this.state.bus ? <i className="fas fa-toggle-on fa-2x"></i> : <i className="fas fa-toggle-off fa-2x"></i>}
              </button>
            </div>
          </Label>
        </FormGroup>
        <LocationSearchInput
          address={this.state.address}
          cities={this.state.cities}
          addCity={this.addCity}
          removeCity={this.removeCity}
          handleAddressChange={this.handleAddressChange}
          handleCityClick={this.showButtons}
          addTraveler={this.addTraveler}
          removeTraveler={this.removeTraveler}
        />
        <button name="button" type="submit" className="btn btn-flat" onClick={() => this.props.onClick(this.state.cities, this.state.dateFrom, this.state.dateTo)}>
          Explore
        </button>
        ---Number of results {this.props.search.numberOfResults}---



      </div>
    );

  };
};
