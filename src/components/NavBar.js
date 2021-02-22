import React from 'react';
import './_NavBar.scss';
import logo from '../img/logo.png';
import FormSearch from './FormSearch';
import Map from './Map';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class NavBarHome extends React.Component {
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

  // getDestinationsWithPrices = (trips, commonDestinations) => {
  //   const destinations = [];
  //   commonDestinations.forEach((destinationName) => {
  //     let totalPrice = this.getTotalPrice(trips, destinationName);
  //     Geocode.fromAddress(destinationName).then(
  //       (response) => {
  //         const { lat, lng } = response.results[0].geometry.location;
  //         this.setState({
  //           destinations: [
  //             ...this.state.destinations,
  //             {
  //               name: destinationName,
  //               lat: lat,
  //               lng: lng,
  //               prices: totalPrice,
  //             },
  //           ],
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   });

  //   return destinations;
  // };

  render() {
    return (
      <div className="header">
        {console.log(this.props)}
        <div className="navbar">
          <div className="navbar-menu">
            <div className="navbar-brand">
              <a href="/">
                <img src={logo} alt="Pading find the perfect place to meet" />
              </a>
            </div>
            <div className="navbar-social">
              <a
                href="https://www.instagram.com/padingapp/?hl=fr"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="value-prop">
            <h1>Trains and flights combinations for people traveling from multiple places</h1>
            <p>
              <b>
                Enter your different departure cities, explore all common destinations to meet at
                the lowest fare
              </b>
            </p>
          </div>
        </div>

        <div className="form">
          <div className="formsearch">
            <FormSearch
              searchTrips={this.props.searchTrips}
              isHomePage={this.state.isHomePage}
              addCity={this.addCity}
              removeCity={this.removeCity}
              citiesFrom={this.state.citiesFrom}
              handleAddressChange={this.handleAddressChange}
              address={this.state.address}
              dateFrom={this.props.searchData ? this.props.searchData.dateFrom : ''}
              dateTo={this.props.searchData ? this.props.searchData.dateTo : ''}
            />
          </div>
          <div className="map">
            {console.log('render map')}
            {console.log(this.props)}
            <Map
              citiesFrom={
                this.props.searchData ? this.props.searchData.cities : this.state.citiesFrom
              }
              citiesTo={
                this.props.searchData && this.props.searchData.destinationsWithPrice
                  ? this.props.searchData.destinationsWithPrice
                  : []
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
