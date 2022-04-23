import React from 'react';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './_DetailsResults.scss';
import FlightInfo from './FlightInfo.js';

export default function DetailsResults(props) {
  const { t } = useTranslation();
  const [showTooltipText, setShowToolTipText] = React.useState(false);

  const displayTooltipText = () => {
    setShowToolTipText(!showTooltipText);
    setTimeout(() => {
      setShowToolTipText(false);
    }, 1000);
  };

  return (
    <div>
      <div className="details-results-travel">
        <div className="details-results-travel-city">
          <span className="to-city">{t("wayTo")} {props.destination}</span>
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

        {props.returnTrip === true && (
          <div className="details-results-travel-return">
            <div className="details-results-travel">
              <div className="details-results-travel-city">
                <span className="to-city">{t("returnTo")} {props.cityFrom}</span>
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
      </div>
      <div className="details-results-book">
        <div className="booking-zone">
          <div className="co2-and-share">
            <a
              href="https://www.clevel.co.uk/offset-carbon/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-co2"
            >
              {/* <span>Offset your <span className="trip-carbon-amount">{props.carbonFootprint} t</span>{t("ofCO2")}</span> */}
            </a>
            <div className="clipboard-btn">
              {showTooltipText ? <span className="tooltip-text">{t("linkCopied")}</span> : ''}
              <CopyToClipboard
                text={
                  'https://www.kiwi.com/fr/booking?&affilid=padingpadingapp&booking_token=' +
                  props.trip.token +
                  '&currency=eur' +
                  '&passengers=' +
                  props.trip.travelers
                }
              >
                <button className="btn-share" onClick={displayTooltipText}>
                  <span>{t("shareTicket")}</span>
                  <i className="fas fa-share-alt fa-lg"></i>
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <a
            href={
              'https://www.kiwi.com/booking?&affilid=padingpadingapp&booking_token=' +
              props.trip.token +
              '&currency=eur' +
              '&passengers=' +
              props.trip.travelers
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn-book"
          >
            <div className="book-for-price">
              <span>{t("bookFor")}</span>
              <span className="trip-pricing-amount">{props.trip.price} EUR</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
