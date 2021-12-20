import React from 'react';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import SortBy from './SortBy';
import TripCard from './TripCard';
import FilterTime from './FilterTime';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';
import Footer from '../../../components/Footer';
import catLost from '..//img/cat-lost.svg';

import { useSelector } from 'react-redux';

export default function Results(props) {
  // const [showFilter, setShowFilter] = React.useState(false);
  const [showSortBy, setShowsortBy] = React.useState(false);
  const [sortByChoice, setSortByChoice] = React.useState('lowest price');

  const showFilter = useSelector((state) => state.search.showFilter);

  const scrollUp = () => {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClickOutside = (event) => {
    setShowsortBy(false);
  };

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

  const comparePrice = (a, b) => {
    if (a.totalPrice < b.totalPrice) {
      return -1;
    }
    if (a.totalPrice > b.totalPrice) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <NavBar scrollUp={scrollUp} />
      <div id="results-page">
        <div className="formsearch-resultspage">
          <FormSearch
            searchTrips={props.searchTrips}
            searchData={props.search}
            displayFormSearchResults={props.displayFormSearchResults}
            isLoading={props.search.isLoading}
          />
        </div>
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
              {props.search.commonDestinations.length > 0 && (
                <div className="filter-sort">
                  <div className="btn-filter" onClick={displayFilter}>
                    <i className="fa fa-filter"></i>
                    Filter
                  </div>
                  <div className="btn-sort" onClick={displaySortBy}>
                    <i className="fas fa-sort-amount-down"></i>
                    Sort by
                    {showSortBy ? (
                      <SortBy
                        sortByPrice={sortByPrice}
                        displaySortBy={displaySortBy}
                        sortByChoice={sortByChoice}
                        handleClickOutside={handleClickOutside}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )}
            </div>
            {showFilter ? (
              <FilterTime search={props.search} showFilter={showFilter} doFilter={props.doFilter} />
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
                                    carbonFootprint={destination.carbonFootprintTotal}
                                  />
                                </div>
                              }
                              key={index}
                            >
                              {(closePopup) => (
                                <div className="popup">
                                  <button className="close-popup" onClick={closePopup}>
                                    <i class="fas fa-times fa-lg"></i>
                                  </button>
                                  <DetailsResultsPopup
                                    destination={destination.name}
                                    trips={props.search.trips}
                                    key={index}
                                    returnTrip={props.search.returnTrip}
                                    carbonFootprint={destination.carbonFootprint}
                                  />
                                </div>
                              )}
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
      <Footer scrollUp={scrollUp} />
    </div>
  );
}
