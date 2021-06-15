import React from 'react';
import './_DetailsResults.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
            <i class="fas fa-map-marker-alt fa-lg"></i>
            <span className="arrive-at">Arrive at {props.destination}</span>
            <span className="number-of-nights">{props.trip.nightsInDest} nights at the destination</span>
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
              <i class="fas fa-map-marker-alt fa-lg"></i>
              <span className="arrive-at">Arrive at {props.cityFrom}</span>
              <span className="welcome-back">Welcome back!</span>
            </div>
          </div>
        )}
      </div>

      <div className="details-results-share-book">
        <div className="details-results-share">
          <a
            href={
              'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' +
              props.trip.token
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-messenger fa-2x"></i>
          </a>
          <CopyToClipboard
            text={
              'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' +
              props.trip.token
            }
            className="clipboard-btn"
          >
            <button>
              <i className="fas fa-link fa-2x"></i>
            </button>
          </CopyToClipboard>
        </div>
        <div className="details-results-price-book">
          <span className="ticket-price">{props.trip.price}€</span>

          <a
            href={
              'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' +
              props.trip.token
            }
            target="_blank"
            rel="noopener noreferrer"
            className="details-results-book"
          >
            <span>Book from {props.cityFrom}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
