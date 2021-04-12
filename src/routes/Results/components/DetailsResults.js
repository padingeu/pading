import React, { useState } from 'react';
import './_DetailsResults.scss';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function DetailsResults(props) {
  const [showDetailsWay, setDetailsWay] = useState(false);
  const [showDetailsReturn, setDetailsReturn] = useState(false);

  return (
    <div>
      <div className="details-results-travel">
        <div className="details-results-travel-way">
          <div className="details-results-travel-way-city">
            <h4>To {props.destination}</h4>
          </div>

          <div className="details-results-travel-way-content">
            <div className="details-results-travel-way-content-section">
              <div className="date-div-1"></div>
              <div className="date-div-2">
                <div className="date-from"></div>
                <i class="fas fa-calendar-day fa-lg"></i>
                <h5>{moment(props.trip.local_departure).format('MMM Do YY')}</h5>
              </div>
              <div className="departure-div-1">
                <h5>{moment(props.trip.local_departure).format('HH:mm a')}</h5>
              </div>
              <div className="departure-div-2">
                <div className="line-top"></div>
                <div className="line-round"></div>
                <div className="line-bottom"></div>
                <h5>{props.cityFrom}</h5>
                <h6>Manchester airport (MAN)</h6>
              </div>
              <div className="traveler-div-1"></div>
              <div className="traveler-div-2">
                <div className="number-travelers"></div>
                <i className="fas fa-user-friends fa-xs"></i>
                <h6>{props.trip.travelers} traveler</h6>
              </div>
              <div className="carrier-div-1">
                <img
                  src="https://www.sebogo.fr/images/airlines/ori/FR.png"
                  width="20px"
                  alt="TODO"
                ></img>
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
                    <h5>2h</h5>
                  </div>
                  <div className="show-more-details" onClick={() => setDetailsWay(!showDetailsWay)}>
                    <i class="fas fa-angle-up fa-lg"></i>
                    <i class="fas fa-angle-down fa-lg"></i>
                  </div>
                </div>

                {showDetailsWay ? (
                  <div className="way-details">
                    <div className="way-details-connection-info">
                      <h5>Connection info</h5>
                    </div>
                    <div className="way-details-connection-info-content">
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
                <h5>{moment(props.trip.local_arrival).format('HH:mm a')}</h5>
              </div>
              <div className="arrival-div-2">
                <div className="line-top"></div>
                <div className="line-round"></div>
                <div className="line-bottom"></div>
                <h5>{props.destination}</h5>
                <h6>Bilbao airport (BIL)</h6>
              </div>
            </div>

            {props.stopover ? (
              <div className="details-results-travel-way-escale-content-section">
                <div className="escale-div-1"></div>
                <div className="escale-div-2">
                  <i class="fas fa-exchange-alt"></i>
                  <div className="line"></div>
                  <i class="far fa-clock fa-lg"></i>
                  <h6>Stopover: 2h05</h6>
                </div>
                <div className="departure-div-1">
                  <h5>12:50 pm</h5>
                </div>
                <div className="departure-div-2">
                  <div className="line-top"></div>
                  <div className="line-round"></div>
                  <div className="line-bottom"></div>
                  <h5>{props.cityFrom}</h5>
                  <h6>Manchester airport (MAN)</h6>
                </div>
                <div className="traveler-div-1"></div>
                <div className="traveler-div-2">
                  <div className="number-travelers"></div>
                  <i className="fas fa-user-friends fa-xs"></i>
                  <h6>{props.trip.travelers} traveler</h6>
                </div>
                <div className="carrier-div-1">
                  <img
                    src="https://www.sebogo.fr/images/airlines/ori/FR.png"
                    width="20px"
                    alt="TODO"
                  ></img>
                </div>
                <div className="carrier-div-2">
                  <div className="line-top"></div>
                  <div className="line-bottom"></div>
                  <div className="travel-company-time">
                    <i class="fas fa-plane fa-lg"></i>
                    <div className="travel-company">
                      <h5>Vueling</h5>
                    </div>
                    <div className="travel-time">
                      <h5>1h30</h5>
                    </div>
                    <div
                      className="show-more-details"
                      onClick={() => setDetailsWay(!showDetailsWay)}
                    >
                      <i class="fas fa-angle-up fa-lg"></i>
                      <i class="fas fa-angle-down fa-lg"></i>
                    </div>
                  </div>

                  {showDetailsWay ? (
                    <div className="way-details">
                      <div className="way-details-connection-info">
                        <h5>Connection info</h5>
                      </div>
                      <div className="way-details-connection-info-content">
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
                            <h6>Vueling</h6>
                          </div>
                        </div>
                        <div className="flight-number">
                          <div className="flight-number-logo">
                            <i class="fas fa-info-circle fa-lg"></i>
                            <h6>Flight no</h6>
                          </div>
                          <div className="flight-number-response">
                            <h6>FR8510</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="arrival-div-1">
                  <h5>2h40 PM</h5>
                </div>
                <div className="arrival-div-2">
                  <div className="line-top"></div>
                  <div className="line-round"></div>
                  <div className="line-bottom"></div>
                  <h5>{props.destination}</h5>
                  <h6>Bilbao airport (BIL)</h6>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="details-results-travel-way-destination-content-section">
              <div className="destination-div-1"></div>

              <div className="destination-div-2">
                <div className="line"></div>
                <i class="fas fa-map-marker-alt fa-lg"></i>
                <h5>Arrive at {props.destination}</h5>
                <h6>{props.trip.nightsInDest} nights at the destination</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="details-results-travel-return">
          <div className="details-results-travel-return-city">
            <h4>To {props.cityFrom}</h4>
          </div>
          <div className="details-results-travel-return-content">
            <div className="details-results-travel-return-content-section">
              <div className="date-div-1"></div>
              <div className="date-div-2">
                <div className="date-from"></div>
                <i class="fas fa-calendar-day fa-lg"></i>
                <h5>Thuesday Nov 17</h5>
              </div>
              <div className="departure-div-1">
                <h5>10:15 PM</h5>
              </div>
              <div className="departure-div-2">
                <div className="line-top"></div>
                <div className="line-round"></div>
                <div className="line-bottom"></div>
                <h5>{props.destination}</h5>
                <h6>Bilbao airport (BIL)</h6>
              </div>
              <div className="traveler-div-1"></div>
              <div className="traveler-div-2">
                <div className="number-travelers"></div>
                <i className="fas fa-user-friends fa-xs"></i>
                <h6>one traveler</h6>
              </div>
              <div className="carrier-div-1">
                <img
                  src="https://www.sebogo.fr/images/airlines/ori/FR.png"
                  width="20px"
                  alt="TODO"
                />
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
                    <h5>2h 10m</h5>
                  </div>
                  <div
                    className="show-more-details"
                    onClick={() => setDetailsReturn(!showDetailsReturn)}
                  >
                    <i class="fas fa-angle-up fa-lg"></i>
                    <i class="fas fa-angle-down fa-lg"></i>
                  </div>
                </div>
                {showDetailsReturn ? (
                  <div className="return-details">
                    <div className="return-details-connection-info">
                      <h5>Connection info</h5>
                    </div>
                    <div className="return-details-connection-info-content">
                      <div className="airline">
                        <div className="airline-logo">
                          <img
                            src="https://www.sebogo.fr/images/airlines/ori/FR.png"
                            width="15px"
                            alt="TODO"
                          />
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
                          <h6>FR7412</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="arrival-div-1">
                <h5>12:25 AM</h5>
              </div>
              <div className="arrival-div-2">
                <div className="line-up"></div>
                <div className="line-round"></div>
                <div className="line-bottom"></div>
                <h5>{props.cityFrom}</h5>
                <h6>Manchester airport (MAN)</h6>
              </div>
            </div>

            {props.stopover ? (
              <div className="details-results-travel-return-escale-content-section">
                <div className="escale-div-1"></div>
                <div className="escale-div-2">
                  <i class="fas fa-exchange-alt"></i>
                  <div className="line"></div>
                  <i class="far fa-clock fa-lg"></i>
                  <h6>Stopover: 2h05</h6>
                </div>
                <div className="departure-div-1">
                  <h5>12:50 pm</h5>
                </div>
                <div className="departure-div-2">
                  <div className="line-top"></div>
                  <div className="line-round"></div>
                  <div className="line-bottom"></div>
                  <h5>{props.cityFrom}</h5>
                  <h6>Manchester airport (MAN)</h6>
                </div>
                <div className="traveler-div-1"></div>
                <div className="traveler-div-2">
                  <div className="number-travelers"></div>
                  <i className="fas fa-user-friends fa-xs"></i>
                  <h6>{props.trip.travelers} traveler</h6>
                </div>
                <div className="carrier-div-1">
                  <img
                    src="https://www.sebogo.fr/images/airlines/ori/FR.png"
                    width="20px"
                    alt="TODO"
                  ></img>
                </div>
                <div className="carrier-div-2">
                  <div className="line-top"></div>
                  <div className="line-bottom"></div>
                  <div className="travel-company-time">
                    <i class="fas fa-plane fa-lg"></i>
                    <div className="travel-company">
                      <h5>Vueling</h5>
                    </div>
                    <div className="travel-time">
                      <h5>1h30</h5>
                    </div>
                    <div
                      className="show-more-details"
                      onClick={() => setDetailsWay(!showDetailsWay)}
                    >
                      <i class="fas fa-angle-up fa-lg"></i>
                      <i class="fas fa-angle-down fa-lg"></i>
                    </div>
                  </div>

                  {showDetailsWay ? (
                    <div className="way-details">
                      <div className="way-details-connection-info">
                        <h5>Connection info</h5>
                      </div>
                      <div className="way-details-connection-info-content">
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
                            <h6>Vueling</h6>
                          </div>
                        </div>
                        <div className="flight-number">
                          <div className="flight-number-logo">
                            <i class="fas fa-info-circle fa-lg"></i>
                            <h6>Flight no</h6>
                          </div>
                          <div className="flight-number-response">
                            <h6>FR8510</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="arrival-div-1">
                  <h5>2h40 PM</h5>
                </div>
                <div className="arrival-div-2">
                  <div className="line-top"></div>
                  <div className="line-round"></div>
                  <div className="line-bottom"></div>
                  <h5>{props.destination}</h5>
                  <h6>Bilbao airport (BIL)</h6>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="details-results-travel-return-destination-content-section">
              <div className="destination-div-1"></div>
              <div className="destination-div-2">
                <div className="line"></div>
                <i class="fas fa-map-marker-alt fa-lg"></i>
                <h5>Come back to {props.cityFrom}</h5>
                <h6>Welcome home!</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-results-share-book">
        <div className="details-results-share">
          <a href="whatsapp://send?text=https://kiwi.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp fa-2x"></i>
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://kiwi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-messenger fa-2x"></i>
          </a>
          <CopyToClipboard text={'https://kiwi.com'} className="clipboard-btn">
            <button>
              <i className="fas fa-link fa-2x"></i>
            </button>
          </CopyToClipboard>
        </div>
        <div className="details-results-price-book">
          <h4 className="ticket-price">{props.trip.price}€</h4>
          <button className="details-results-book">
            <h4>Book ticket</h4>
          </button>
        </div>
      </div>
    </div>
  );
}