import React from 'react';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import '../components/_FormSearch.scss';
import { Input, Label, FormGroup } from 'reactstrap';
import {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
export default class FormSearch extends React.Component {

  state = {
    dateFrom: new Date(),
    dateTo: new Date(),
    plane: true,
    train: true,
    bus: true,
    firstClick: true,
    cities: [],
    address: ''
  };

  onSelectDate = date => {
    if (this.state.firstClick) {
      this.setState({ dateFrom: date });
    } else {
      this.setState({ dateTo: date });
    }
    this.setState({ firstClick: !this.state.firstClick })
  }

  addCity = async address => {

    const position = await geocodeByAddress(address);
    console.log(position)
    const LatLng = await getLatLng(position[0]);
    const city = position[0].address_components[0].long_name

    this.setState(
      { coordinates: LatLng,
        cities: [...this.state.cities, city],
        address: ''
      })
  };

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
    this.setState({ plane: !this.state.plane})
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
        <DatesPicker dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} onSelectDate={this.onSelectDate}/>
        <FormGroup check className="travel-checkbox">
          <Label check>
            <div className="vehicle-type">
                <h5>Flight</h5>
                <button
                  className="toggle-btn"
                  onClick={this.onPlaneClick}
                >
                { this.state.plane ? <i className="fas fa-toggle-on fa-2x"></i> : <i className="fas fa-toggle-off fa-2x"></i> }
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
                { this.state.train ? <i className="fas fa-toggle-on fa-2x"></i> : <i className="fas fa-toggle-off fa-2x"></i> }
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
              { this.state.bus ? <i className="fas fa-toggle-on fa-2x"></i> : <i className="fas fa-toggle-off fa-2x"></i> }
              </button>
            </div>
          </Label>
        </FormGroup>
        <LocationSearchInput address={this.state.address} cities={this.state.cities} addCity={this.addCity} removeCity={this.removeCity} handleAddressChange={this.handleAddressChange}/>
        <button name="button" type="submit" className="btn btn-flat" onClick={() => this.props.onClick(this.state.cities)}>
          Explore
        </button>
        ---Number of results {this.props.search.numberOfResults}---
        {this.state.cities}
      </div>
    );

  };
};
