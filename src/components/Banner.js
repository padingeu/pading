import React from 'react';
import './_Banner.scss';
import NavBar from './NavBar';
import FormSearch from './FormSearch';
import bannerDesktop1 from '../img/travel-markers.svg';
import bannerDesktop2 from '../img/cats-traveling.svg';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Banner extends React.Component {
  state = {
    isHomePage: true,
    citiesFrom: this.props.searchData ? this.props.searchData.cities : [],
    address: '',
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
    console.log(address);
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
    console.log(cities);
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
          <div className="banner-background">
            <img
              className="banner-1"
              alt="coloured shapes of the logo Pading"
              src={bannerDesktop1}
            />
            {this.props.isResultsPage ? (
              ''
            ) : (
              <img
                className="banner-2"
                alt="cats friends gathering in a same place"
                src={bannerDesktop2}
              />
            )}
          </div>
          <div className="valueprop">
            <div className="valueprop-title-details">
              <h1 className="valueprop-title">TRAVEL TO GATHER</h1>
              <p className="valueprop-details">Meet your friends somewhere</p>
            </div>
          </div>
          <div className="formsearch-banner">
            <FormSearch
              dateFrom={this.props.searchData ? this.props.searchData.dateFrom : ''}
              dateTo={this.props.searchData ? this.props.searchData.dateTo : ''}
              searchTrips={this.props.searchTrips}
              isLoading={this.props.isLoading}
              isHomePage={this.state.isHomePage}
              addCity={this.addCity}
              removeCity={this.removeCity}
              citiesFrom={this.state.citiesFrom}
              handleAddressChange={this.handleAddressChange}
              address={this.state.address}
            />
          </div>
        </div>
      </div>
    );
  }
}
