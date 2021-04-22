import React, { useState } from 'react';
import './_FlightInfo.scss';
import './_DetailsResults.scss';
import moment from 'moment';

export default function FlightInfo(props) {
  const [showDetailsWay, setDetailsWay] = useState(false);

  const getDuration = (departure_time, arrival_time) => {
    const diff = moment(arrival_time).diff(moment(departure_time));
    console.log(diff);
    let duration = moment.utc(diff).hours() + 'h';
    console.log(duration);
    console.log(moment.utc(diff).hours);
    const minutes = moment.utc(diff).minutes();
    if (minutes > 0) {
      duration += minutes;
    }
    return duration;
  };

  return (
    <div className="details-results-travel-content">
      <div className="details-results-travel-content-section">
        <div className="date-div-1"></div>
        <div className="date-div-2">
          <div className="date-from"></div>
          <i class="fas fa-calendar-day fa-lg"></i>
          <h5>{moment(props.route.local_departure).format('MMM Do YYYY')}</h5>
        </div>
        <div className="departure-div-1">
          <h5>{moment(props.route.local_departure).format('HH:mm a')}</h5>
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
          <h6>{props.travelers} traveler</h6>
        </div>
        <div className="carrier-div-1">
          <img src="https://www.sebogo.fr/images/airlines/ori/FR.png" width="20px" alt="TODO"></img>
        </div>

        <div className="carrier-div-2">
          <div className="line-top"></div>
          <div className="line-bottom"></div>
          <div className="travel-company-time">
            <i class="fas fa-plane fa-lg"></i>
            <div className="travel-company">
              <h5>Ryanair</h5>
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
                    <img
                      src="https://www.sebogo.fr/images/airlines/ori/FR.png"
                      width="15px"
                      alt="TODO"
                    ></img>
                    <h6>Airline</h6>
                  </div>
                  <div className="airline-response">
                    <h6>Ryanair</h6>
                  </div>
                </div>
                <div className="flight-number">
                  <div className="flight-number-logo">
                    <i class="fas fa-info-circle fa-lg"></i>
                    <h6>Flight no</h6>
                  </div>
                  <div className="flight-number-response">
                    <h6>FR7504</h6>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="arrival-div-1">
          <h5>{moment(props.route.local_arrival).format('HH:mm a')}</h5>
        </div>
        <div className="arrival-div-2">
          <div className="line-top"></div>
          <div className="line-round"></div>
          <div className="line-bottom"></div>
          <h5>{props.route.cityTo}</h5>
          <h6>
            {props.cityTo} Airport ({props.route.flyTo})
          </h6>
        </div>
      </div>
    </div>
  );
}
