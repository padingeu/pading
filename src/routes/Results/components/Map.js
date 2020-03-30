import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

export default class Map extends React.Component {
  state = {
    viewport: {
      width: '100%',
      height: '500px',
      latitude: 48.856614,
      longitude: 2.352222,
      zoom: 3
    }
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibG91aXMxNDA0IiwiYSI6ImNrNm0zOGFkMDBqdG8zZXA3NGR5ejhzYnQifQ.Yt9WzWg8hdm6b9h5k5sxHw"
        mapStyle="mapbox://styles/louis1404/ck81ia7to0qxs1io6wcvcckig"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Marker latitude={48.8534} longitude={2.3488}>
          <div>Paris</div>
        </Marker>
        <Marker latitude={43.2627} longitude={-2.9253}>
          <div>Bilbao</div>
        </Marker>
        <Marker latitude={37.8833} longitude={-4.7667}>
          <div>Córdoba</div>
        </Marker>
        <Marker latitude={41.902784} longitude={12.496366}>
          <div>Roma</div>
        </Marker>
        <Marker latitude={53.4807593} longitude={-2.2426305}>
          <div>Manchester</div>
        </Marker>
      </ReactMapGL>
    );
  }
}
