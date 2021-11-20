import React from 'react';
import { format } from 'date-fns';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import SelectedCities from './SelectedCities';
import './_FormSearch.scss';
import onClickOutside from 'react-onclickoutside';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
var lodash = require('lodash');

class FormSearch extends React.Component {
  state = {
    citiesFrom: this.props.searchData ? this.props.searchData.cities : [],
    address: '',
    returnTrip: true,
    displayFromWhereScreen: false,
    displayTravelersScreen: false,
    displayDatesPicker: false,
    displayDetailsScreen: false,
    dateFrom: this.props.dateFrom,
    dateTo: this.props.dateTo,
    showFilter: false,
    showDateFrom: false,
    showDateTo: false,
    directTrip: false,
    flexibleTrip: false,
    displayFullFormSearchResults: false
  };


  scrollDown() {
    setTimeout(
      () => document.querySelector('.travel-results').scrollIntoView({ behavior: 'smooth' }),
      150
    );
  }

  search = () => {
    this.props.searchTrips(
      this.state.citiesFrom,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.directTrip,
      this.state.returnTrip,
      this.state.flexibleTrip,
      
    );
    this.scrollDown();
    window.gtag('event', 'search trip', {
      'event_category': format(this.state.dateFrom, 'dd/MM/yyyy'),
      'event_label': this.state.citiesFrom.map(function(city) { return city['name']}).toString(),
      'value': ''
    });
    this.setState({ displayDetailsScreen: false })
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

  switchOneWayReturn = (event) => {
    event.preventDefault();
    this.setState({ returnTrip: !this.state.returnTrip });
  };

  startPlanningTrip = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: true });
  }

  openfullFormSearchResults = (event) => {
    event.preventDefault();
    this.setState({displayfullFormSearchResults: !this.state.displayFormSearchResults});
  }

  goToHomePage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
  }

  goToResultsPage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: false });
  }

  goToFromWherePage = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayFromWhereScreen: true });
  }

  goToTravelersPage = (event) => {
    event.preventDefault();
    this.setState({ displayFromWhereScreen: false });
    this.setState({ displayDatesPicker: false });
    this.setState({ displayTravelersScreen: true });
  }

  goToDatesPicker = (event) => {
    event.preventDefault();
    this.setState({ displayTravelersScreen: false });
    this.setState({ displayDetailsScreen: false });
    this.setState({ displayDatesPicker: true });
  }

  goToDetailsPage = (event) => {
    event.preventDefault();
    this.setState({ displayDatesPicker: false });
    this.setState({ displayDetailsScreen: true });
  }

  displayFilter = (event) => {
    event.preventDefault();
    this.setState({ showFilter: !this.state.showFilter });
  }

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
      <div className="formsearch">
        {this.props.searchData && console.log(this.props.searchData)}

        {this.props.isHomePage ?
          <div className="formsearch-bar">
            <button
              className="fromwhere-btn"
              onClick={(event) => this.startPlanningTrip(event)}
            >
              <span>From where do you travel ?</span>
            </button>
            <button
              className="traveltype-btn"
              onClick={(event) => {
                this.switchOneWayReturn(event);
              }}
            >
              {this.state.returnTrip ? 'Return' : 'One-way'}
            </button>
          </div> :
          <div className="formsearch-bar">
            <button
              className="fromwhere-btn"
              onClick={lodash.sum(Object.values(this.props.searchData.travelers)) > 1 ? (event) => this.openfullFormSearchResults(event) : (event) => this.startPlanningTrip(event)}
            >
              <span>From where do you travel ?</span>
            </button>
            <button
              className="traveltype-btn"
              onClick={(event) => {
                this.switchOneWayReturn(event)
              }}
            >
              {this.state.returnTrip ? 'Return' : 'One-way'}
            </button>
          </div>
        }
        {this.state.displayfullFormSearchResults ?
          <div className="formsearch-results">
            <div className="formsearch-bar">
              <button
                className="fromwhere-btn"
                onClick={(event) => this.startPlanningTrip(event)}
              >
                <span>From {Object.keys(this.props.searchData.travelers).join(', ')}</span>
              </button>
              <button
                className="traveltype-btn"
                onClick={(event) => {
                  this.switchOneWayReturn(event);
                  this.goToDatesPicker(event)
                }}
              >
                {this.state.returnTrip ? 'Return' : 'One-way'}
              </button>
            </div>
            <div className="formsearch-bar-2">
              <button
                className="formsearch-bar-2-btn dates-btn"
                onClick={(event) => {this.goToDatesPicker(event)}}
              >
                <i class="far fa-calendar-alt"></i>
                {this.props.searchData.returnTrip ?
                  `${format(this.props.searchData.dateFrom, 'dd/MM/yyyy')} - ${format(this.props.searchData.dateTo, 'dd/MM/yyyy')}`
                :
                  `${format(this.props.searchData.dateFrom, 'dd/MM/yyyy')} - no return`
                }
              </button>
              <button
                onClick={(event) => {this.goToTravelersPage(event)}}
                className="formsearch-bar-2-btn travelers-btn"
              >
                <i class="far fa-user"></i>
                {this.props.searchData && lodash.sum(Object.values(this.props.searchData.travelers))} travelers
              </button>
            </div>
          </div>
        : ''}

        {this.state.displayFromWhereScreen ?
          <div className="search-screen">
            <div className="searchbar">
              <button
                className="btn-back"
                onClick={this.props.isHomePage ? (event) => {this.goToHomePage(event)} : (event) => {this.goToResultsPage(event)}}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <LocationSearchInput
                address={this.state.address}
                cities={this.state.citiesFrom}
                addCity={this.addCity}
                removeCity={this.removeCity}
                handleAddressChange={this.handleAddressChange}
              />
            </div>
            <SelectedCities
              address={this.state.address}
              cities={this.state.citiesFrom}
              addCity={this.addCity}
              removeCity={this.removeCity}
              handleCityClick={this.showButtons}
              addTraveler={this.addTraveler}
              removeTraveler={this.removeTraveler}
            />
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.state.citiesFrom.length > 1)}
                onClick={(event) => {this.goToTravelersPage(event)}}
              >
                {this.state.citiesFrom.length < 2 ? 'Select two or more departure cities' : 'Select these cities'}
              </button>
            </div>
          
          </div>
        :''}

        {this.state.displayTravelersScreen ?
          <div className="search-screen">
            <div className="searchbar">
              <button
                className="btn-back"
                onClick={this.props.isHomePage ? (event) => {this.goToFromWherePage(event)} : (event) => {this.goToResultsPage(event)}}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="searchbar-question">How many travelers are you ?</span>
            </div>
            <div className="cities-and-travelers">
              {this.state.citiesFrom.map((city) => {
                return (
                <div className="travelers-departure-city">
                  <span className="departure-city-name">{city.name}</span>
                  <div className="people-number-change">
                    <i
                      className="edit-travelers far fa-minus-square fa-lg"
                      onClick={(event) => this.removeTraveler(event, city)}
                    ></i>
                    <span className="number-of-travelers">{city.numberOfPeople}</span>
                    <i
                      className="edit-travelers far fa-plus-square fa-lg"
                      onClick={(event) => this.addTraveler(event, city)}
                    ></i>
                    </div>
                </div>
                )
              })}
            </div>
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.state.citiesFrom.length > 0)}
                onClick={(event) => {this.goToDatesPicker(event)}}
              >
                Continue
              </button>
            </div>
          </div>
        : ''}

        {this.state.displayDatesPicker ?
          <div className="search-screen">
            <div className="searchbar">
              <button
                className="btn-back"
                onClick={this.props.isHomePage ? (event) => {this.goToTravelersPage(event)} : (event) => {this.goToResultsPage(event)}}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <DatesPicker
                  returnTrip={this.state.returnTrip}
                  dateFrom={this.state.dateFrom}
                  dateTo={this.state.dateTo}
                  showDateFrom={true}
                  showDateTo={true}
                  onChange={this.onInputDateChange}
               />
            </div>
          
            
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.state.dateFrom)}
                onClick={(event) => {this.goToDetailsPage(event)}}
              >
                Continue
              </button>
            </div>
          </div>
        : ''}

        {this.state.displayDetailsScreen ?
          <div className="search-screen">
            <div className="searchbar">
               <button
                  className="btn-back"
                  onClick={this.props.isHomePage ? (event) => {this.goToDatesPicker(event)} : (event) => {this.goToResultsPage(event)}}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="searchbar-question">Some specific criteria ?</span>
              </div>
              <div className="criteria">
                <div className="criteria-buttons">
                  <button
                    onClick={(event) => {this.switchToDirect(event)}}
                    className={this.state.directTrip ? 'criteria-btn criteria-btn-active' : 'criteria-btn'}
                  >
                    Only direct
                  </button>
                  <button
                  onClick={(event) => {this.switchToFlexibleTrip(event)}}
                    className="criteria-btn"
                  >
                    Flexible trip +/- 1 day
                  </button>
                </div>
              </div>
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.state.citiesFrom.length > 0)}
                onClick={() => this.search()}
              >
                Find the best destinations !
              </button>
            </div>
          </div>
        : ''}
        
      </div>
      /*<div className="formsearch">
        <div className="travel-options">
          <div className="travel-type">
            {this.state.showTravelTypeBtn ? (
              <div className="travel-type-change">
                <button
                  onClick={(event) => {
                    this.switchToOneWay(event);
                    this.showTravelTypeBtn();
                  }}
                >
                  <div className="check-box">
                    {this.state.travelType === 'One-way' ? (
                      <img alt="choice selector" src={iconCircle} className="icon-circle-select" />
                    ) : null}
                  </div>
                  <span>One-way</span>
                </button>
                <button
                  onClick={(event) => {
                    this.switchToReturn(event);
                    this.showTravelTypeBtn();
                  }}
                >
                  <div className="check-box">
                    {this.state.travelType === 'Return' ? (
                      <img alt="choice selector" src={iconCircle} className="icon-circle-select" />
                    ) : null}
                  </div>
                  <span>Return</span>
                </button>
              </div>
            ) : null}
            <button className="travel-type-btn" onClick={this.switchTravelTypeBtn}>
              {this.state.travelType}

              <div className="chevron-up-down">
                <i className="fas fa-angle-down fa-lg"></i>
              </div>
            </button>
          </div>

          <div className="stop-trip">
            {this.state.showStopTripBtn ? (
              <div className="stop-trip-change">
                <button
                  onClick={(event) => {
                    this.switchToIndirect(event);
                    this.showStopTripBtn();
                  }}
                >
                  <div className="check-box">
                    {this.state.stopTrip === 'All routes' ? (
                      <img alt="choice selector" src={iconCircle} className="icon-circle-select" />
                    ) : null}
                  </div>
                  <span>All routes</span>
                </button>
                <button
                  onClick={(event) => {
                    this.switchToDirect(event);
                    this.showStopTripBtn();
                  }}
                >
                  <div className="check-box">
                    {this.state.stopTrip === 'Only direct' ? (
                      <img alt="choice selector" src={iconCircle} className="icon-circle-select" />
                    ) : null}
                  </div>
                  <span>Only direct</span>
                </button>
              </div>
            ) : null}
            <button className="stop-trip-btn" onClick={this.switchStopTripBtn}>
              {this.state.stopTrip}

              <div className="chevron-up-down">
                <i className="fas fa-angle-down fa-lg"></i>
              </div>
            </button>
          </div>
        </div>
        <div className="travel-form">
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
          <LocationSearchInput
            address={this.props.address}
            cities={this.props.citiesFrom}
            addCity={this.props.addCity}
            removeCity={this.props.removeCity}
            handleAddressChange={this.props.handleAddressChange}
          />
          <button
            className="btn btn-explore"
            name="button"
            disabled={!(this.state.dateFrom && this.props.citiesFrom.length > 0)}
            type="submit"
            onClick={() => this.search()}
          >
            {this.props.dis}
            {this.props.isLoading ? <div className="loader"></div> : <div>Explore</div>}
          </button>
          <SelectedCities
            cities={this.props.citiesFrom}
            addCity={this.props.addCity}
            removeCity={this.props.removeCity}
            handleCityClick={this.showButtons}
            addTraveler={this.addTraveler}
            removeTraveler={this.removeTraveler}
            address={this.props.address}
          />
        </div>
      </div>*/
    );
  }
}

export default onClickOutside(FormSearch);