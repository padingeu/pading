import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class LocationSearchInput extends React.Component {
  state = {
    address: '',
    coordinates: ''
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    const position = await geocodeByAddress(address);
    const LatLng = await getLatLng(position[0]);
    this.setState({ coordinates: LatLng})
    console.log(this.state.coordinates);
  };

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
           <input {...getInputProps({ placeholder: 'Type address', type: 'text'})} />

           <div>
            {loading ? <div>...Loading</div> : null}
           </div>
            {suggestions.map((suggestion) => {
              const style = { backgroundColor: suggestion.active ? '#1EDD88' : '#fff', cursor: 'pointer'}
              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              )
            })}
          </div>
        )}
        </PlacesAutocomplete>
      </div>
    )
  }
}
