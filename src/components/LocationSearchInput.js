import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import '../components/_LocationSearchInput.scss';

export default class LocationSearchInput extends React.Component {
  state = {
    address: '',
    coordinates: '',
    places: []
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = async address => {
    const position = await geocodeByAddress(address);
    const LatLng = await getLatLng(position[0]);
    this.setState({ coordinates: LatLng})
    console.log(this.state.coordinates);

    this.setState({ places: [...this.state.places, address]});
    this.setState({ address: '' });
    console.log(this.state.places);
  };

  handleRemove = (event, index) => {
    event.preventDefault();
    this.state.places.splice(index, 1);
    this.setState({ places: this.state.places });
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
           <input {...getInputProps({ className: 'city-departure-input', placeholder: 'Departure cities ', type: 'text'})} />
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

        <div className="cities-departure">
          {
            this.state.places.map((city, index) => {
              return (
                <div className="city-div">
                  <div className="number-of-people">
                    <i className="fas fa-user-friends fa-xs"></i>
                    <h6>1</h6>
                    <div className="chevron-up-down">
                      <i class="fas fa-chevron-down fa-xs"></i>
                    </div>
                  </div>
                  <div className="city-departure" key={index}>
                    <div className="city-departure-people">
                      <p>{city}</p>
                    </div>
                    <button className="remove-city-btn " onClick={this.handleRemove}><i class="fas fa-times-circle"></i></button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
