import React from 'react';
import '../components/_LocationSearchInput.scss';
import PlacesAutocomplete from 'react-places-autocomplete';
import onClickOutside from 'react-onclickoutside';

class LocationSearchInput extends React.Component {
  state = {
    autoCompleteClass: ''
  };

  handleClickOutside = () => {
    this.setState({ autoCompleteClass: '' });
  }

  cityAutocompleteActive = () => {
    this.setState({ autoCompleteClass: 'city-autocomplete' });
  }

  render() {
    return (
      <div className="hello">
        <div className="places-autocomplete">
          <PlacesAutocomplete
            value={this.props.address}
            onChange={this.props.handleAddressChange}
            onSelect={this.props.addCity}
            searchOptions={{ types: ['(cities)'] }}
            highlightFirstSuggestion={true}
            onClickOutside={this.handleClickOutside}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  onClick={this.cityAutocompleteActive}
                  {...getInputProps({ className: 'city-departure-input', placeholder: 'We travel from...', type: 'text' })}
                />
                  <div className={this.state.autoCompleteClass}>
                <div>
                  {loading ? <div>...Loading</div> : null}
                </div>
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#f5a741' : '#fff', cursor: 'pointer',
                    'fontWeight': 'bold',
                    'height': '30px'

                  }
                  return (
                    <div className="suggestions-form" {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  )
                })}
                  </div>
              </div>
            )}

          </PlacesAutocomplete>
        </div>
      </div>
    )
  }
}

export default onClickOutside(LocationSearchInput);

