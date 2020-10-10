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
                    <i className="fas fa-location-arrow fa-xl"></i>
                    <span className="label">We travel from ...</span>
                  </div>
                  <span className="focus-bg"></span>
                  <div>{loading ? <div>...Loading</div> : null}</div>
                  <div className="cities-proposal">
                    {suggestions.map((suggestion) => {
                      if (!suggestion.id) {
                        suggestion.id = Math.random();
                      }
                      const style = {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        color: '#262626',
                        fontFamily: 'Roboto',
                        fontSize: '1.4rem',
                        fontWeight: suggestion.active ? '700' : '400',
                        textAlign: 'left',
                        paddingLeft: '2rem',
                        height: '3rem',
                      };
                      return (
                        <div
                          className="suggestions-form"
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.active ? <i className="far fa-dot-circle"></i> : null}
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
