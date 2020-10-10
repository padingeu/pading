import React from 'react';
import './_Home.scss';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';
import Map from '../../../components/Map';
import Why from './Why';
import How from './How';
import Simple from './Simple';
import Cards from './Cards';
import MyClimate from './MyClimate';
import Footer from '../../../components/Footer';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Home extends React.Component {
  state = {
    isHomePage: true,
    citiesFrom: [],
    address: ''
  };

  scrollUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

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
        <NavBar />
        <div className="banner">
          <div className="formsearch">
            <FormSearch 
            searchTrips={this.props.searchTrips}
            isHomePage={this.state.isHomePage}
            addCity={this.addCity}
            removeCity={this.removeCity}
            citiesFrom={this.state.citiesFrom}
            handleAddressChange={this.handleAddressChange}
            address={this.state.address}/>
          </div>
          <div className="map-home">
            <Map
              citiesFrom={this.state.citiesFrom}
              citiesTo={[]}
            />
          </div>
        </div>
        <Why />
        <How />
        <Simple />
        <MyClimate />
        <Cards />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
