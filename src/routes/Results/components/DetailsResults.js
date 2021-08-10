import React from 'react';
import './_DetailsResults.scss';
import FlightInfo from './FlightInfo.js';

export default function DetailsResults(props) {
  return (
    <div>
      <div className="details-results-travel">
        <div className="details-results-travel">
          <div className="details-results-travel-city">
            <span className="to-city">To {props.destination}</span>
          </div>
          {props.trip.wayRoutes.map((route, index) => {
            return (
              <FlightInfo
                route={route}
                duration={props.trip.duration}
                travelers={props.trip.travelers}
                isFirstFlight={index === 0}
                key={index}
              />
            );
          })}
        </div>
        <div className="details-results-travel-destination-content-section">
          <div className="destination-div-1"></div>

          <div className="destination-div-2">
            <div className="line"></div>
            <i className="fas fa-map-marker-alt fa-lg"></i>
            <span className="arrive-at">Arrive in {props.destination}</span>
            <span className="number-of-nights">
              {props.trip.nightsInDest} nights at the destination
            </span>
          </div>
        </div>
        {props.travelType === 'Return' && (
          <div className="details-results-travel-return">
            <div className="details-results-travel">
              <div className="details-results-travel-city">
                <span className="to-city">To {props.cityFrom}</span>
              </div>
              {props.trip.returnRoutes.map((route, index) => {
                return (
                  <FlightInfo
                    route={route}
                    duration={props.trip.duration}
                    travelers={props.trip.travelers}
                    isFirstFlight={index === 0}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        )}
        {props.travelType === 'Return' && (
          <div className="details-results-travel-destination-content-section">
            <div className="destination-div-1"></div>
            <div className="destination-div-2">
              <div className="line"></div>
              <i className="fas fa-map-marker-alt fa-lg"></i>
              <span className="arrive-at">Arrive in {props.cityFrom}</span>
              <span className="welcome-back">Welcome back!</span>
            </div>
          </div>
        )}
      </div>
      <div className="details-results-book">
        <div className="carbonfootprint">
          <div className="carbonfootprint-amount">
            <i className="fas fa-smog fa-lg"></i>
            <span>1.399 t</span>
          </div>
        </div>
        <a
          href={
            'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' +
            props.trip.token
          }
          target="_blank"
          rel="noopener noreferrer"
          className="btn-book"
        >
          <span>Book</span>
          <span className="trip-pricing-amount">{props.trip.price} EUR</span>
        </a>
      </div>
    </div>
  );
}
