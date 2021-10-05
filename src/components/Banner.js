import React from 'react';
import './_Banner.scss';
import FormSearch from './FormSearch';
import friendsTogether from '../img/friends-together.png';
import bannerDesktopLarge from '../img/banner-desktop-large.svg';
import bannerDesktop from '../img/banner-desktop.svg';
import bannerTabletLarge from '../img/banner-tablet-large.svg';
import bannerTablet from '../img/banner-tablet.svg';
import bannerMobileLarge from '../img/banner-mobile-large.svg';
import bannerMobile from '../img/banner-mobile.svg';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Banner extends React.Component {
  state = {
    citiesFrom: this.props.searchData ? this.props.searchData.cities : [],
    address: ''
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

  render() {
    return (
      <div>
        <div className="banner">
          <img
            className='banner-desktop-large'
            alt="coloured shapes of the logo Pading"
            src={bannerDesktopLarge}
          />
          <img
            className='banner-desktop'
            alt="coloured shapes of the logo Pading"
            src={bannerDesktop}
          />
          <img
            className='banner-tablet-large'
            alt="coloured shapes of the logo Pading"
            src={bannerTabletLarge}
          />
           <img
            className='banner-tablet'
            alt="coloured shapes of the logo Pading"
            src={bannerTablet}
          />
          <img
            className='banner-mobile-large'
            alt="coloured shapes of the logo Pading"
            src={bannerMobileLarge}
          />
           <img
            className='banner-mobile'
            alt="coloured shapes of the logo Pading"
            src={bannerMobile}
          />
          <div className="valueprop">
            <div className="valueprop-title-details">
              <h1 className="valueprop-title">TRAVEL TO GATHER</h1>
              <span className="valueprop-details-desktop">Fill in your friends' departure cities and your own,
              <br />
              travel to common destinations and meet halfway !
              </span>
              <span className="valueprop-details-mobile">Fill in your friends' departure cities and your own, travel to common destinations and meet halfway
              </span>
            </div>
            <img
              className='valueprop-img'
              alt="friends meeting "
              src={friendsTogether}
            />
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
