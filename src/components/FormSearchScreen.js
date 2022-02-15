import React from 'react';
import onClickOutside from 'react-onclickoutside';
import './_FormSearchScreen.scss';
import DatesPicker from './DatesPicker';
import LocationSearchInput from './LocationSearchInput';
import SelectedCities from './SelectedCities';

class FormSearchScreen extends React.Component {
  render() {
    return (
      <div>
        {this.props.displayFromWhereScreen ? (
          <div className="search-screen">
            <div className="searchbar">
              <button
                className="btn-back"
                onClick={
                  this.props.isHomePage
                    ? (event) => {
                        this.props.goToHomePage(event);
                      }
                    : (event) => {
                        this.props.goToResultsPage(event);
                      }
                }
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <LocationSearchInput
                address={this.props.address}
                cities={this.props.citiesFrom}
                addCity={this.props.addCity}
                removeCity={this.props.removeCity}
                handleAddressChange={this.props.handleAddressChange}
              />
            </div>
            <SelectedCities
              address={this.props.address}
              cities={this.props.citiesFrom}
              addCity={this.props.addCity}
              removeCity={this.props.removeCity}
              handleCityClick={this.props.showButtons}
              addTraveler={this.props.addTraveler}
              removeTraveler={this.props.removeTraveler}
            />
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.props.citiesFrom.length > 1)}
                onClick={(event) => {
                  this.props.goToTravelersPage(event);
                }}
              >
                {this.props.citiesFrom.length < 2
                  ? 'Select at least 2 departure cities'
                  : 'Select these cities'}
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        {this.props.displayTravelersScreen ? (
          <div className="search-screen">
            <div className="searchbar">
              <button className="btn-back" onClick={(event) => this.props.goToFromWherePage(event)}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="searchbar-question">Number of travelers</span>
            </div>
            <div className="cities-and-travelers">
              {this.props.citiesFrom.map((city) => {
                return (
                  <div className="travelers-departure-city" key={city.name}>
                    <span className="departure-city-name">{city.name}</span>
                    <div className="people-number-change">
                      <i
                        className="edit-travelers far fa-minus-square fa-lg"
                        onClick={(event) => this.props.removeTraveler(event, city)}
                      ></i>
                      <span className="number-of-travelers">{city.numberOfPeople}</span>
                      <i
                        className="edit-travelers far fa-plus-square fa-lg"
                        onClick={(event) => this.props.addTraveler(event, city)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.props.citiesFrom.length > 0)}
                onClick={(event) => {
                  this.props.goToDatesPicker(event);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        {this.props.displayDatesPicker ? (
          <div className="search-screen">
            <div className="searchbar">
              <button className="btn-back" onClick={(event) => this.props.goToTravelersPage(event)}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <DatesPicker
                returnTrip={this.props.returnTrip}
                dateFrom={this.props.dateFrom}
                dateTo={this.props.dateTo}
                showDateFrom={true}
                showDateTo={true}
                onChange={this.props.onInputDateChange}
              />
            </div>
            <div className="criteria">
              <div className="criteria-buttons">
                <button
                  onClick={(event) => {
                    this.props.switchOneWayReturn(event);
                  }}
                  className={
                    !this.props.returnTrip ? 'criteria-btn criteria-btn-active' : 'criteria-btn'
                  }
                >
                  No return
                </button>
                <button
                  onClick={(event) => {
                    this.props.switchToDirect(event);
                  }}
                  className={
                    this.props.directTrip ? 'criteria-btn criteria-btn-active' : 'criteria-btn'
                  }
                >
                  Only direct
                </button>
              </div>
            </div>
            <div className="search-criteria-confirm">
              <button
                className="search-criteria-confirma-btn"
                name="button"
                disabled={!(this.props.citiesFrom.length > 0) || !this.props.dateFrom}
                onClick={() => this.props.search()}
              >
                {this.props.dateFrom ? 'Find the best destinations !' : 'Select your travel dates'}
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default onClickOutside(FormSearchScreen);
