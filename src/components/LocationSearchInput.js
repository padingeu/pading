import React from 'react';
import '../components/_LocationSearchInput.scss';
import PlacesAutocomplete from 'react-places-autocomplete';
export default class LocationSearchInput extends React.Component {
  state = {
    coordinates: '',
    active: false
  };


  switchButton = (event, city) => {
    event.preventDefault();
    city.numberOfPeople++
    this.props.cities = this.props.cities[this.props.cities.findIndex(el => el=== city)] = city;
    this.setState({ switchOnBtn: !this.state.SwitchOnBtn });
  }


  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.props.address}
          onChange={this.props.handleAddressChange}
          onSelect={this.props.addCity}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
           <input {...getInputProps({ className: 'city-departure-input', placeholder: 'We travel from...', type: 'text'})} />
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
            this.props.cities.map((city, index) => {
              return (
                <div key={index}>
                  <div className="city-div">
                    <div className="number-of-people-btn-link">
                      <div>                   
                        <button onClick={(event) => this.switchButton(event, city)}>
                          <div className="number-of-people-btn">
                            <i className="fas fa-user-friends fa-xs"></i>
                            <h6>1</h6>
                            <div className="chevron-up-down">
                              <i className="fas fa-chevron-down fa-xs"></i>
                            </div>
                          </div>
                        </button>

                      </div>
                    </div>

                    <div className="city-departure" key={index}>
                      <div className="city-departure-people">
                        <p>{city.name}</p>
                      </div>
                      <button className="remove-city-btn " onClick={this.props.removeCity}><i className="fas fa-times-circle"></i></button>
                    </div>

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

// Return date cannnot be before departure date
// Month navbar cannot be clickable
// City can be only selected if it is from google places api
// open div when clicking on btn to change number of people and manage state
