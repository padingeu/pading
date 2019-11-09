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


  render() {
    return (
      <div className="travel-form">
          <p>Where do you travel from?</p>
          <DatesPicker dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} onSelectDate={this.onSelectDate}/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <FormGroup check className="travel-checkbox">
           
            <Label check>
              <Input type="checkbox"/>{' '}
              Plane
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Train
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Bus
            </Label>
          </FormGroup>
          <LocationSearchInput address={this.state.address} cities={this.state.cities} addCity={this.addCity} removeCity={this.removeCity} handleAddressChange={this.handleAddressChange}/>
          <button name="button" type="submit" className="btn btn-flat" onClick={() => this.props.onClick(this.state.cities)}>
              <i className="fas fa-search"></i> Search
          </button>
          ---Number of results {this.props.search.numberOfResults}---
          {this.state.cities}
          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      </div>
    );

  };
};
