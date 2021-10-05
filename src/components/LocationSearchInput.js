import React from 'react';
import '../components/_LocationSearchInput.scss';
import PlacesAutocomplete from 'react-places-autocomplete';
import onClickOutside from 'react-onclickoutside';

class LocationSearchInput extends React.Component {
  state = {
    autoCompleteClass: '',
  };

  handleClickOutside = () => {
    this.setState({ autoCompleteClass: '' });
  };

  cityAutocompleteActive = () => {
    this.setState({ autoCompleteClass: 'city-autocomplete' });
  };

  render() {
    return (
      <div className="location-search-input">
        <PlacesAutocomplete
          value={this.props.address}
          onChange={this.props.handleAddressChange}
          onSelect={this.props.addCity}
          searchOptions={{ types: ['(cities)'] }}
          highlightFirstSuggestion={true}
          onClickOutside={this.handleClickOutside}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={this.state.autoCompleteClass}>
              <form noValidate autoComplete="off">
                <label className="inp">
                  <input
                    className="city-departure-input"
                    type="text"
                    onClick={this.cityAutocompleteActive}
                    {...getInputProps({ className: 'city-departure-input' })}
                  />
                  <div className="arrow-and-label">
                  <i class="fas fa-plane-departure"></i>

                    {this.props.cities.length === 0 ? (
                      <span className="label">Add a first departure city</span>
                    ) : (
                      <span className="label">Add more departure cities</span>
                    )}
                  </div>
                  <span className="focus-bg"></span>
                  <div>{loading ? <p>...Loading</p> : null}</div>
                  <div className="cities-proposal">
                    {suggestions.map((suggestion) => {
                      if (!suggestion.id) {
                        suggestion.id = Math.random();
                      }
                      const style = {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: suggestion.active ? '#f5f5f5' : 'white',
                        borderBottom: 'solid #ebebeb',
                        borderWidth: '0.1rem',
                        cursor: 'pointer',
                        fontFamily: 'PT Sans',
                        fontSize: '1.4rem',
                        fontWeight: '400',
                        textAlign: 'left',
                        padding: '2rem 1rem 2rem 1rem',
                        height: '3rem',
                      };
                      return (
                        <div
                          className="suggestions-form"
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </label>
              </form>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default onClickOutside(LocationSearchInput);
