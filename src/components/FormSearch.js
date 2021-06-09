import React from 'react';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import SelectedCities from './SelectedCities';
import './_FormSearch.scss';
import onClickOutside from 'react-onclickoutside';

class FormSearch extends React.Component {
  state = {
    dateFrom: this.props.dateFrom,
    dateTo: this.props.dateTo,
    showDateFrom: false,
    showDateTo: false,
    travelType: 'Return',
    stopTrip: 'All routes',
    plane: true,
    shouldSearch: false,
    showTravelTypeBtn: false,
    showStopTripBtn: false,
  };

  search = () => {
    this.props.searchTrips(
      this.props.citiesFrom,
      this.state.dateFrom,
      this.state.dateTo,
      this.state.stopTrip,
      this.state.travelType
    );
    this.scrollDown();
  };

  scrollDown() {
    document.scrollingElement.scrollTo({
      top: 800,
      behavior: 'smooth',
    });
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
    this.setState({ stopTrip: 'All routes' });
  };

  switchToDirect = (event) => {
    event.preventDefault();
    this.setState({ stopTrip: 'Only direct' });
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

  showTravelTypeBtn = () => {
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  };

  showStopTripBtn = () => {
    this.setState({ showStopTripBtn: !this.state.showStopTripBtn });
  };

  switchTravelTypeBtn = (event) => {
    event.preventDefault();
    this.setState({ showCalendar: false });
    this.setState({ showStopTripBtn: false });
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  };

  switchStopTripBtn = (event) => {
    event.preventDefault();
    this.setState({ showCalendar: false });
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: !this.state.showStopTripBtn });
  };

  handleClickOutside = () => {
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: false });
  };

  render() {
    return (
      <div className="formsearch">
         <div className="travel-options">
            <div className="travel-type">
              {this.state.showTravelTypeBtn ? (
                <div className="travel-type-change">
                  <a
                    href="/"
                    onClick={(event) => {
                      this.switchToOneWay(event);
                      this.showTravelTypeBtn();
                    }}
                  >
                    <div className="check-box">
                      {this.state.travelType === 'One-way' ? (
                        <i className="fas fa-check fa-xs"></i>
                      ) : null}
                    </div>
                    <div className="one-way-return-div">
                      <span>One-way</span>
                    </div>
                  </a>

                  <a
                    href="/"
                    onClick={(event) => {
                      this.switchToReturn(event);
                      this.showTravelTypeBtn();
                    }}
                  >
                    <div className="check-box">
                      {this.state.travelType === 'Return' ? (
                        <i className="fas fa-check fa-xs"></i>
                      ) : null}
                    </div>
                    <div className="one-way-return-div">
                      <span>Return</span>
                    </div>
                  </a>
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
                  <a
                    href="/"
                    onClick={(event) => {
                      this.switchToIndirect(event);
                      this.showStopTripBtn();
                    }}
                  >
                    <div className="check-box">
                      {this.state.stopTrip === 'All routes' ? (
                        <i className="fas fa-check fa-xs"></i>
                      ) : null}
                    </div>
                    <div className="stop-div">
                      <span>All routes</span>
                    </div>
                  </a>

                  <a
                    href="/"
                    onClick={(event) => {
                      this.switchToDirect(event);
                      this.showStopTripBtn();
                    }}
                  >
                    <div className="check-box">
                      {this.state.stopTrip === 'Only direct' ? (
                        <i className="fas fa-check fa-xs"></i>
                      ) : null}
                    </div>
                    <div className="stop-div">
                      <span>Only direct</span>
                    </div>
                  </a>
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
              //disabled={!(this.state.dateFrom && this.props.citiesFrom.length > 0)}
              type="submit"
              onClick={() => this.search()}
            >
              {this.props.dis}
              {this.props.isLoading ? (
                <div className="loader"></div>
              ) : (
                <div>
                  Explore
                </div>
              )}
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
      </div>
    );
  }
}

export default onClickOutside(FormSearch);