import React, { useState } from 'react';
import './_FlightInfo.scss';
import './_DetailsResults.scss';
import moment from 'moment';
import 'moment-duration-format';
import Img from 'react-cool-img';

export default function FlightInfo(props) {
  const [showDetailsWay, setDetailsWay] = useState(false);

  const airlines = {
    U2: 'EasyJet',
    AF: 'Air France',
    FR: 'Ryanair',
    VY: 'Vueling',
    TO: 'Transavia',
    LH: 'Lufhansa',
    IB: 'Iberia',
    W6: 'Wizz Air',
    V7: 'Volotea',
    AZ: 'Alitalia',
    BA: 'British Airways',
    OS: 'Austrian Airlines',
    AY: 'Finnair',
    SK: 'Scandinavian Airlines System',
    KL: 'KLM',
    TK: 'Turkish Airlines',
    SU: 'Aeroflot',
    AB: 'Air Berlin',
    LX: 'SWISS',
    SN: 'Brussels Airlines',
    EI: 'Aer Lingus',
    OU: 'Croatia Airlines',
    LV: 'Air Albania',
    TP: 'Tap Air Portugal',
    A3: 'Aegean Airlines',
    BE: 'Flybe',
    UX: 'Air Europa',
    XK: 'Air Corsica',
    OK: 'Czech Airlines',
    LO: 'LOT Polish Airlines',
    PS: 'Ukraine International Airlines',
    RO: 'TAROM',
    '6B': 'TUIfly',
    A5: 'Hop!',
    BT: 'Air Baltic',
    JU: 'Air Serbia',
    KM: 'Air Malta',
    B2: 'Belavia',
    FB: 'Bulgaria Air',
    JP: 'Adria Airways',
    ZI: 'Aigle Azur',
    YM: 'Montenegro Airlines',
    '4U': 'German Wings',
    U6: 'Ural Airlines',
    BJ: 'Nouvelair Tunisia',
    '9U': 'Air Moldova',
    BM: 'BMI Regional',
    T7: 'TWIN JET',
    '2L': 'Helvetic',
    '0B': 'Blue Air',
    TU: 'Tunisair',
    PC: 'Pegasus Airlines',
  };

  let image_path = '';
  try {
    image_path = require(`../../../img/logos_airlines/${props.route.airline}.png`);
  } catch (err) {
    image_path = require(`../../../img/simple-logo.png`);
  }

  const getDuration = (departure_time, arrival_time) => {
    const milliseconds = moment(arrival_time).diff(moment(departure_time));
    const duration = moment.duration(milliseconds, 'milliseconds');
    if (duration.hours() === 0) {
      return duration.format('m') + ' min';
    } else {
      return duration.format('h ; mm').replace(';', 'h');
    }
  };

  const getAirlineName = (airline_code) => {
    return airlines[airline_code];
  };

  return (
    <div className="details-results-travel-content">
      <div className="details-results-travel-content-section">
        <div className="date-div-1"></div>
        {props.isFirstFlight ?
          <div className="date-div-2">
            <div className="date-from"></div>
            <i class="fas fa-calendar-day fa-lg"></i>
            <h5>{moment.utc(props.route.local_departure).format('MMM Do YYYY')}</h5>
          </div>
        :
          <div className="stopover-div">
            <i class="fas fa-exchange-alt"></i>
            <h5>stopover</h5>
          </div>
       }
        <div className="departure-div-1">
          <h5>{moment.utc(props.route.local_departure).format('HH:mm a')}</h5>
        </div>
        <div className="departure-div-2">
          <div className="line-top"></div>
          <div className="line-round"></div>
          <div className="line-bottom"></div>
          <h5>{props.route.cityFrom}</h5>
          <h6>
            {props.route.cityFrom} Airport ({props.route.flyFrom})
          </h6>
        </div>
        <div className="traveler-div-1"></div>
        <div className="traveler-div-2">
          <div className="number-travelers"></div>
          <i className="fas fa-user-friends fa-xs"></i>
          <h6>
            {props.travelers} traveler{props.travelers > 1 ? 's' : ''}
          </h6>
        </div>
        <div className="carrier-div-1">
          <Img src={image_path} alt={getAirlineName(props.route.airline)} />
        </div>

        <div className="carrier-div-2">
          <div className="line-top"></div>
          <div className="line-bottom"></div>
          <div className="travel-company-time">
            <i class="fas fa-plane fa-lg"></i>
            <div className="travel-company">
              <h5>{getAirlineName(props.route.airline)}</h5>
            </div>
            <div className="travel-time">
              <h5>{getDuration(props.route.local_departure, props.route.local_arrival)}</h5>
            </div>
            <div className="show-more-details" onClick={() => setDetailsWay(!showDetailsWay)}>
              <i class="fas fa-angle-up fa-lg"></i>
              <i class="fas fa-angle-down fa-lg"></i>
            </div>
          </div>

          {showDetailsWay ? (
            <div className="route-details">
              <div className="route-details-connection-info">
                <h5>Connection info</h5>
              </div>
              <div className="route-details-connection-info-content">
                <div className="airline">
                  <div className="airline-logo">
                    <Img src={image_path} alt={getAirlineName(props.route.airline)} />
                    <h6>Airline</h6>
                  </div>
                  <div className="airline-response">
                    <h6>{getAirlineName(props.route.airline)}</h6>
                  </div>
                </div>
                <div className="flight-number">
                  <div className="flight-number-logo">
                    <i class="fas fa-info-circle fa-lg"></i>
                    <h6>Flight no</h6>
                  </div>
                  <div className="flight-number-response">
                    <h6>
                      {props.route.airline}
                      {props.route.flight_no}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="arrival-div-1">
          <h5>{moment.utc(props.route.local_arrival).format('HH:mm a')}</h5>
        </div>
        <div className="arrival-div-2">
          <div className="line-top"></div>
          <div className="line-round"></div>
          <div className="line-bottom"></div>
          <h5>{props.route.cityTo}</h5>
          <h6>
            {props.route.cityTo} Airport ({props.route.flyTo})
          </h6>
        </div>
      </div>
    </div>
  );
}
