import React from 'react';
import Banner from '../../../components/Banner';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import TripCard from './TripCard';
import FilterDepartureTime from './FilterDepartureTime';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';
import iconCircle from '../../../img/icon-circle.svg';

export default function Results(props) {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSortBy, setShowsortBy] = React.useState(false);
  const [sortByChoice, setSortByChoice] = React.useState('Lowest Price');

  const displayFilter = () => {
    setShowFilter(!showFilter);
  };

  const displaySortBy = () => {
    setShowsortBy(!showSortBy);
  };

  const sortByPrice = (event) => {
    event.preventDefault();
    setSortByChoice('Lowest Price');
  };

  const sortByCarbFootprint = (event) => {
    event.preventDefault();
    setSortByChoice('carb. footprint');
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
        isResultsPage={true}
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
                      <span>lowest price</span>
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
                      <span>carb. footprint</span>
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
                      <span>same schedule</span>
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </button>
            </div>
          </div>
          {showFilter ? (
            <FilterDepartureTime
              search={props.search}
              showFilter={showFilter}
              doFilter={props.doFilter}
            />
          ) : (
            ''
          )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
