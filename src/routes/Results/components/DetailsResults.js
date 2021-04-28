import React, { useState, useEffect } from 'react';
import './_DetailsResults.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FlightInfo from './FlightInfo.js';
import TinyURL from 'tinyurl';

export default function DetailsResults(props) {
  const [link, setLink] = useState();

  useEffect(() => {
    async function fetchData() {
      TinyURL.shorten(
        'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' + props.trip.token
      ).then(
        function (res) {
          console.log(res);
          setLink(res);
        },
        function (err) {
          console.log(err);
        }
      );
    }

    fetchData();
  }, [props]);
  return (
    <div>
      <div className="details-results-travel">
        <div className="details-results-travel">
          <div className="details-results-travel-city">
            <h4>To {props.destination}</h4>
          </div>
          {props.trip.departureRoutes.map((route, index) => {
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
            <h5>Arrive at {props.destination}</h5>
            <h6>{props.trip.nightsInDest} nights at the destination</h6>
          </div>
        </div>
        {props.travelType === 'Return' && (
          <div className="details-results-travel">
            <div className="details-results-travel-city">
              <h4>To {props.cityFrom}</h4>
            </div>
            {props.trip.arrivalsRoutes.map((route, index) => {
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
        )}
        {props.travelType === 'Return' && (
          <div className="details-results-travel-destination-content-section">
            <div className="destination-div-1"></div>
            <div className="destination-div-2">
              <div className="line"></div>
              <i class="fas fa-map-marker-alt fa-lg"></i>
              <h5>Arrive at {props.cityFrom}</h5>
              <h6>Welcome back!</h6>
            </div>
          </div>
        )}
      </div>

      <div className="details-results-share-book">
        <div className="details-results-share">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp fa-2x"></i>
          </a>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-messenger fa-2x"></i>
          </a>
          <CopyToClipboard text={link} className="clipboard-btn">
            <button>
              <i className="fas fa-link fa-2x"></i>
            </button>
          </CopyToClipboard>
        </div>
        <div className="details-results-price-book">
          <h4 className="ticket-price">{props.trip.price}€</h4>

          <a
            href={
              'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' +
              props.trip.token
            }
            target="_blank"
            rel="noopener noreferrer"
            className="details-results-book"
          >
            <h4>Book from {props.cityFrom}</h4>
          </a>
        </div>
      </div>
    </div>
  );
}
