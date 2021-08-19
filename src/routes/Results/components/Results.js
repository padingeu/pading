import React from 'react';
import Banner from '../../../components/Banner';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import TripCard from './TripCard';
import FilterTime from './FilterTime';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';
import iconCircle from '../../../img/icon-circle.svg';
import catLost from '..//img/cat-lost.svg';

import { useSelector } from 'react-redux';

export default function Results(props) {
  // const [showFilter, setShowFilter] = React.useState(false);
  const [showSortBy, setShowsortBy] = React.useState(false);
  const [sortByChoice, setSortByChoice] = React.useState('lowest price');

  const showFilter = useSelector((state) => state.search.showFilter);

  //

  const displayFilter = () => {
    props.clickOnFilter(props.search.showFilter);
  };

  const displaySortBy = () => {
    setShowsortBy(!showSortBy);
  };

  const sortByPrice = (event) => {
    event.preventDefault();
    setSortByChoice('lowest price');
    props.search.commonDestinations.sort(comparePrice);
  };

  const sortByCarbFootprint = (event) => {
    event.preventDefault();
    setSortByChoice('carb. footprint');
    props.search.commonDestinations.sort(compareFootprint);
  };

  const compareFootprint = (a, b) => {
    if (a.carbonFootprint < b.carbonFootprint) {
      return -1;
    }
    if (a.carbonFootprint > b.carbonFootprint) {
      return 1;
    }
    return 0;
  };

  const comparePrice = (a, b) => {
    if (a.totalPrice < b.totalPrice) {
      return -1;
    }
    if (a.totalPrice > b.totalPrice) {
      return 1;
    }
    return 0;
  };

  const sortBySchedule = (event) => {
    event.preventDefault();
    setSortByChoice('same schedule');
  };

  return (
    <div>
      <Banner
        isLoading={props.search.isLoading}
        searchTrips={props.searchTrips}
        searchData={props.search}
      />

      <div className="travel-results">
        <div className="travel-results-cards">
          <div className="linear-progress-filter">
            <div className="linear-progress-div">
              {props.search.isLoading && (
                <div className="linear-progress">
                  <LinearProgress />
                </div>
              )}
            </div>

            <div className="filter-sort">
              <button className="btn-filter" onClick={displayFilter}>
                <i className="fas fa-filter"></i>
                Filter
              </button>
              <button className="btn-sort" onClick={displaySortBy}>
                <i className="fas fa-sort-amount-down"></i>
                Sort by
                {showSortBy ? (
                  <div className="sortby-change">
                    <button
                      onClick={(event) => {
                        sortByPrice(event);
                        displaySortBy();
                      }}
                    >
                      <div className="check-box">
                        {sortByChoice === 'lowest price' ? (
                          <img
                            alt="choice selector"
                            src={iconCircle}
                            className="icon-circle-select"
                          />
                        ) : null}
                      </div>
                      <span>Lowest price</span>
                    </button>
                    <button
                      onClick={(event) => {
                        sortByCarbFootprint(event);
                        displaySortBy();
                      }}
                    >
                      <div className="check-box">
                        {sortByChoice === 'carb. footprint' ? (
                          <img
                            alt="choice selector"
                            src={iconCircle}
                            className="icon-circle-select"
                          />
                        ) : null}
                      </div>
                      <span>Carb. footprint</span>
                    </button>

                    <button
                      onClick={(event) => {
                        sortBySchedule(event);
                        displaySortBy();
                      }}
                    >
                      <div className="check-box">
                        {sortByChoice === 'same schedule' ? (
                          <img
                            alt="choice selector"
                            src={iconCircle}
                            className="icon-circle-select"
                          />
                        ) : null}
                      </div>
                      <span>Same schedule</span>
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </button>
            </div>
          </div>

          <FilterTime search={props.search} showFilter={showFilter} doFilter={props.doFilter} />

          <div id="cards-results-wrapper">
            {props.search.isLoading ? (
              <div className="cards-results">
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
              </div>
            ) : (
              <div>
                {props.search.commonDestinations.length > 0 ? (
                  <div className="cards-results">
                    {props.search.commonDestinations.map((destination, index) => {
                      return (
                        <div className={index} key={index}>
                          <Popup
                            modal
                            trigger={
                              <div>
                                <TripCard
                                  destination={destination.name}
                                  totalPrice={destination.totalPrice}
                                  pricesPerDepartureCity={destination.pricesPerDepartureCity}
                                  travelers={props.search.travelers}
                                  key={index}
                                  carbonFootprint={destination.carbonFootprint}
                                />
                              </div>
                            }
                            key={index}
                          >
                            <DetailsResultsPopup
                              destination={destination.name}
                              trips={props.search.trips}
                              key={index}
                              travelType={props.search.travelType}
                            />
                          </Popup>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="alert-nodestination">
                    <img src={catLost} alt="no destination was found" width="200px" />
                    <p>
                      No destination was found
                      <br />
                      Try other dates or departure cities
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
