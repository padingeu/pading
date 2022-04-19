import React from 'react';
import FilterBar from './FilterBar';
import './_FilterDepartureTime.scss';

export default function FilterTime(props) {
  const [departureFilter, setDepartureFilter] = React.useState({});
  const [returnFilter, setReturnFilter] = React.useState({});

  const doF = (filter, city, type) => {
    const trips = { ...props.search.initialTrips };
    const fullFilter = {
      departure: departureFilter,
      return: returnFilter,
    };

    if (type === 'departure') {
      departureFilter[city] = {
        start: filter[0],
        end: filter[1],
      };
      setDepartureFilter(departureFilter);
      fullFilter['departure'] = departureFilter;
    }
    if (type === 'return') {
      returnFilter[city] = {
        start: filter[0],
        end: filter[1],
      };
      setReturnFilter(returnFilter);
      fullFilter['return'] = returnFilter;
    }

    props.doFilter(fullFilter, trips, props.search.cities, props.search.carb);
  };

  return (
    <div className="filter-div">
      <div className="filter-table">
        <div className="filter-table-way">
          <div className="filter-table-header">
            <p>Departure times</p>
          </div>

          {props.search &&
            props.search.cities.map((city, index) => {
              return (
                <div className="filter-table-body">
                  <p>From {city.name}</p>
                  <FilterBar filter={doF} city={city.name} type="departure" />
                </div>
              );
            })}
        </div>
        {props.search.returnTrip ? (
          <div className="filter-table-return">
            <div className="filter-table-header">
              <p>Return times</p>
            </div>

            {props.search &&
              props.search.cities.map((city, index) => {
                return (
                  <div className="filter-table-body">
                    <p>To {city.name}</p>
                    <FilterBar filter={doF} city={city.name} type="return" />
                  </div>
                );
              })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
