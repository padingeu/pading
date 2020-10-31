import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import './_Map.scss';
import yellowMarker from '../img/yellow-marker.png';
import greenMarkerDest from '../img/green-marker-dest.png';
import { PersonPinCircleSharp } from '@material-ui/icons';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(API_KEY);

export default class Map extends React.Component {
  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 48.856614,
      longitude: 4.352222,
      zoom: 3,
    },
    destinations:[]
  };

  componentDidMount() {
    const destinations = this.props.citiesTo
    for (let i = 0; i < destinations.length; i++) {
     Geocode.fromAddress(destinations[i]).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ destinations: [...this.state.destinations, {
            name: destinations[i],
            lat: lat,
            lng: lng
          }] });
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  

  render() {
    
    return (
      
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibG91aXMxNDA0IiwiYSI6ImNrNm0zOGFkMDBqdG8zZXA3NGR5ejhzYnQifQ.Yt9WzWg8hdm6b9h5k5sxHw"
        mapStyle="mapbox://styles/louis1404/ckbfbhg8x21z51ik4rb1ylkrn"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {this.props.citiesFrom.map((city) => (
          <Marker key={city.name} latitude={parseFloat(city.lat)} longitude={parseFloat(city.lng)}>
            <button className="marker-departure-city">
              <img src={yellowMarker} alt="Departure city" />
            </button>
          </Marker>
        ))}
        {this.state.destinations.map((city) =>  (
           <Marker key={city.name} latitude={city.lat} longitude={city.lng}>
          <button className="marker-departure-city">
            <img src={greenMarkerDest} alt="Destination city" />
          </button>
        </Marker>
        )
        )}
      </ReactMapGL>
    );
  }
}
