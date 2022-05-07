import React from 'react';
import { withTranslation } from 'react-i18next';
import onClickOutside from 'react-onclickoutside';
import './_ClassicFormSearchScreen.scss';
import ClassicLocationSearchInput from './ClassicLocationSearchInput';
import DatesPicker from './DatesPicker';

class ClassicFormSearchScreen extends React.Component {
  render() {
    return (
      <div>
        {this.props.displayFromWhereScreen ? (
          <div className="classic-search-screen">
            <div className="classic-searchbar">
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
              <ClassicLocationSearchInput
                isClassicSearchPage={this.props.isClassicSearchPage}
                address={this.props.address}
                cities={this.props.citiesFrom}
                addCity={this.props.addCity}
                removeCity={this.props.removeCity}
                handleAddressChange={this.props.handleAddressChange}
              />
               <ClassicLocationSearchInput
                isClassicSearchPage={this.props.isClassicSearchPage}
                address={this.props.address}
                cities={this.props.citiesFrom}
                addCity={this.props.addCity}
                removeCity={this.props.removeCity}
                handleAddressChange={this.props.handleAddressChange}
              />
              <DatesPicker />
     
      
                <label className="classic-searchbar-question">
                  <input
                    className="input-travelers"
                    type="text"
                    placeholder="1 traveler"
                  />     
              </label>

  
              <div className="classic-search-criteria-confirm">
                <button
                  className="classic-search-criteria-confirma-btn"
                  name="button"
                  //disabled="{!(this.props.citiesFrom.length > 0) || !this.props.dateFrom}"
                  onClick={() => this.props.search()}
                >
                  Let's go !
                </button>
              </div>
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
                  {this.props.t("noReturn")}
                </button>
                <button
                  onClick={(event) => {
                    this.props.switchToDirect(event);
                  }}
                  className={
                    this.props.directTrip ? 'criteria-btn criteria-btn-active' : 'criteria-btn'
                  }
                >
                  {this.props.t("onlyDirect")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withTranslation()(onClickOutside(ClassicFormSearchScreen));
