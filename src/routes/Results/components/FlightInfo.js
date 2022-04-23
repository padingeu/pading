import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './_FlightInfo.scss';
import './_DetailsResults.scss';
import moment from 'moment';
import 'moment-duration-format';
import Img from 'react-cool-img';
import { getSrc, airlines } from '../../../utils/common.js';

export default function FlightInfo(props) {
  const { t } = useTranslation();
  const [showDetailsWay, setDetailsWay] = useState(false);

  let image_path = '';
  try {
    image_path = require(`../img/airlinesLogos/${props.route.airline}.png`);
  } catch (err) {
    image_path = require(`../../../img/simple-logo-pading.png`);
  }
  const src = getSrc(image_path);

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
        {props.isFirstFlight ? (
          <div className="date-div-2">
            <div className="date-from"></div>
            <i className="fas fa-calendar-day fa-lg"></i>
            <span className="travel-date">
              {moment.utc(props.route.local_departure).format('MMM Do YYYY')}
            </span>
          </div>
        ) : (
          <div className="stopover-div">
            <i className="fas fa-exchange-alt"></i>
            <span className="stopover">{t('flightConnection')}</span>
          </div>
        )}
        <div className="departure-div-1">
          <span className="date-from-time">
            {moment.utc(props.route.local_departure).format('HH:mm')}
          </span>
        </div>
        <div className="departure-div-2">
          <div className="line-top"></div>
          <div className="line-round"></div>
          <div className="line-bottom"></div>

          <div className="city-from">
            <span className="city-from-name">{props.route.cityFrom}</span>
            <span className="city-from-code">({props.route.flyFrom})</span>
          </div>
        </div>
        <div className="carrier-div-1">
          <Img src={src} alt={`${getAirlineName(props.route.airline)} logo`} />
        </div>

        <div className="carrier-div-2">
          <div className="line-top"></div>
          <div className="line-bottom"></div>
          <div className="travel-company-time">
            <i className="fas fa-plane fa-lg"></i>
            <div className="travel-company">
              <span className="airline-name">{getAirlineName(props.route.airline)}</span>
            </div>
            <div className="travel-duration">
              <span className="travel-duration-hours">
                {getDuration(props.route.utc_departure, props.route.utc_arrival)}
              </span>
            </div>
            <span className="travelers-number">
              {props.travelers} {props.travelers > 1 ? `${t('travelers')}` : `${t('traveler')}`}
            </span>
            <div className="show-more-details" onClick={() => setDetailsWay(!showDetailsWay)}>
              <i className="fas fa-angle-up fa-lg"></i>
              <i className="fas fa-angle-down fa-lg"></i>
            </div>
          </div>

          {showDetailsWay ? (
            <div className="route-details">
              <div className="route-details-connection-info-content">
                <div className="airline">
                  <span className="airline-name">{t('airline')}</span>
                  <span className="airline-response">{getAirlineName(props.route.airline)}</span>
                </div>
                <div className="flight-number">
                  <span className="flight-no">{t('flightNo')}</span>
                  <span className="flight-number-response">
                    {props.route.airline}
                    {props.route.flight_no}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="arrival-div-1">
          <span className="arrival-time">
            {moment.utc(props.route.local_arrival).format('HH:mm')}
          </span>
        </div>
        <div className="arrival-div-2">
          <div className="line-top"></div>
          <div className="line-round"></div>
          <div className="line-bottom"></div>
          <div className="city-to">
            <span className="city-to-name">{props.route.cityTo}</span>
            <span className="city-to-code">({props.route.flyTo})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
