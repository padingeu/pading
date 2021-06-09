import React from 'react';
import Filter from './Filter';
import './_FilterDepartureTime.scss';

export default function FilterDepartureTime(props) {
    const [departureFilter, setDepartureFilter] = React.useState({});
    const [returnFilter, setReturnFilter] = React.useState({});
  
    const doFilter = (filter, city, type) => {
        const trips = { ...props.search.initialTrips };
        const fullFilter = {
          departure: departureFilter,
          return: returnFilter,
        };
    
        if (type === 'departure') {
          setDepartureFilter({
            start: filter[0],
            end: filter[1],
          });
          fullFilter['departure'] = departureFilter;
        }
        if (type === 'return') {
          setReturnFilter({
            start: filter[0],
            end: filter[1],
          });
          fullFilter['return'] = returnFilter;
        }
    
        props.doFilter(
          fullFilter,
          trips,
          props.search.cities,
          city,
          props.search.initialDestinationsWithPrice
        );
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
                            <p>from {city.name}</p>
                            <Filter filter={doFilter} city={city.name} type="departure" />
                        </div>
                        );
                     }
                )}
            </div>
            {props.search.travelType === 'Return' ? (
                <div className="filter-table-return">
                    <div className="filter-table-header">
                        <p>Return times</p>
                    </div>
            
                    {props.search &&
                        props.search.cities.map((city, index) => {
                            return (
                                <div className="filter-table-body">
                                    <p>to {city.name}</p>
                                    <Filter filter={doFilter} city={city.name} type="return" />
                                </div>
                            );
                        }
                    )}
                </div>
            ) : (
              ''
          )}
      </div>
    </div>
  )
}
  