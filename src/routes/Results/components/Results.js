import React from 'react';
import Banner from '../../../components/Banner';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import TripCard from './TripCard';
import FilterDepartureTime from './FilterDepartureTime';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';

export default function Results (props) {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSortBy, setShowsortBy] = React.useState(false);


  const displayFilter = () => {
    setShowFilter(!showFilter);
  };

  const displaySortBy = () => {
    setShowsortBy(!showSortBy);
  };

  const getPriceForDestination = (trips, destination, city) => {
    let tripsForDestination = trips[city].filter((trip) => {
      return trip.cityTo === destination;
    });
    let prices = tripsForDestination.map((trip) => {
      return trip.price;
    });
    return Math.min.apply(null, prices);
  };

  const getTotalPrice = (trips, destination) => {
    const pricesList = [];
    let totalPrice = 0;
    Object.keys(trips).forEach((city) => {
      const price = getPriceForDestination(trips, destination, city);
      totalPrice += price;
      pricesList.push({ city: city, price: price });
    });

    return {
      pricesPerDestination: pricesList,
      totalPrice: totalPrice,
    };
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
              <button
                className="btn-filter"
                onClick={displayFilter}
              >
                <i className="fas fa-filter"></i>
                Filter
              </button>
              <button
                className="btn-sort"
                onClick={displaySortBy}
              >
                <i class="fas fa-sort-amount-down"></i>
                Sort by
                {showSortBy ? (
                <div className="sortby-change">
                  <span>lowest price</span>
                  <span>carb. footprint</span>
                  <span>same schedule</span>
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
                              destination={destination}
                              prices={getTotalPrice(props.search.trips, destination)}
                              travelers={props.search.travelers}
                              key={index}
                            />
                          </div>
                        }
                        key={index}
                      >
                        <DetailsResultsPopup
                          destination={destination}
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
