import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import './_Map.scss';
import yellowMarker from '../img/yellow-marker.png';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(API_KEY);

export default class Map extends React.Component {
  state = {
    viewport: {
      width: '100%',
      height: '500px',
      latitude: 48.856614,
      longitude: 2.352222,
      zoom: 3,
    },
  };



  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibG91aXMxNDA0IiwiYSI6ImNrNm0zOGFkMDBqdG8zZXA3NGR5ejhzYnQifQ.Yt9WzWg8hdm6b9h5k5sxHw"
        mapStyle="mapbox://styles/louis1404/ck81ia7to0qxs1io6wcvcckig"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {/* {this.props.citiesFrom.map((city) => (
          <Marker key={city.name} latitude={parseFloat(city.lat)} longitude={parseFloat(city.lng)}>
            <button className="marker-departure-city">
              <img src={yellowMarker} alt="Departure city" />
            </button>
          </Marker>
        ))} */}
        {console.log('cities to ' + this.props.citiesTo)}
      </ReactMapGL>
    );
  }
}
