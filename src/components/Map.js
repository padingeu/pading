import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import './_Map.scss';
import yellowMarker from '../img/yellow-marker.png';
import greenMarkerDest from '../img/green-marker-dest.png';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(API_KEY);

export default class Map extends React.Component {
  state = {
    viewport: {
      height: '100%',
      width: '100%',
      latitude: 48.856614,
      longitude: 4.352222,
      maxZoom: 3,
      minZoom: 3,
      interactive: true,

      iconAllowOverlap: false,
    },
    destinations: [],
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibG91aXMxNDA0IiwiYSI6ImNrNm0zOGFkMDBqdG8zZXA3NGR5ejhzYnQifQ.Yt9WzWg8hdm6b9h5k5sxHw"
        mapStyle="mapbox://styles/louis1404/ck6m5f35i0ucc1impooorg2qu"
        onViewportChange={(viewport) => this.setState({ viewport })}
        width="dummyValue"
      >
        {this.props.citiesFrom.map((city) => (
          <Marker key={city.name} latitude={parseFloat(city.lat)} longitude={parseFloat(city.lng)}>
            <button className="marker-departure-city">
              <img src={yellowMarker} alt="Departure city" />
            </button>
          </Marker>
        ))}
        {this.props.citiesTo.map((city) => (
          <Marker key={city.name} latitude={city.lat} longitude={city.lng}>
            <button className="marker-destination">
              <img src={greenMarkerDest} alt="Destination city" />
              <p>{city.prices.totalPrice} €</p>
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    );
  }
}
