import axios from 'axios';
import lodash from 'lodash';
import { history } from '../index';
import moment from 'moment';
import { format } from 'date-fns';

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
    pricesPerDepartureCity: pricesList,
    totalPrice: totalPrice,
  };
};

const compare = (a, b) => {
  if (a.totalPrice < b.totalPrice) {
    return -1;
  }
  if (a.totalPrice > b.totalPrice) {
    return 1;
  }
  return 0;
};

const getWayRoutes = (routes, cityTo) => {
  const wayRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].cityFrom === cityTo) {
      break;
    }
    wayRoutes.push(routes[i]);
  }
  return wayRoutes;
};

const getReturnRoutes = (routes, cityTo) => {
  const arrivalRoutes = [];
  for (let i = routes.length - 1; i >= 0; i--) {
    if (routes[i].cityTo === cityTo) {
      break;
    }
    arrivalRoutes.push(routes[i]);
  }
  return arrivalRoutes.reverse();
};

const getLocalDepartureDate = (arrivalRoutes) => {
  return arrivalRoutes[0].local_departure;
};

const getLocalArrivalDate = (arrivalRoutes) => {
  return arrivalRoutes[arrivalRoutes.length - 1].local_arrival;
};

const getUtcDepartureDate = (arrivalRoutes) => {
  return arrivalRoutes[0].utc_departure;
};

const getUtcArrivalDate = (arrivalRoutes) => {
  return arrivalRoutes[arrivalRoutes.length - 1].utc_arrival;
};

const allDepartureHaveTrips = (trips, cities) => {
  for (let i = 0; i < cities.length; i++) {
    if (trips[cities[i]['name']].length === 0) {
      return false;
    }
  }
  return true;
};

const getCommonDestinations = (trips, cities) => {
  //Recuperer une liste des destinations communes
  let commonTrips = [];
  let commonDestinations = [];
  if (allDepartureHaveTrips(trips, cities)) {
    if (cities.length === 1 && cities[0].name in trips) {
      commonTrips = trips[cities[0].name];
    } else {
      for (let i = 1; i < cities.length; i++) {
        let city1 = cities[i - 1].name;
        let city2 = cities[i].name;
        if (i === 1) {
          commonTrips = lodash.intersectionBy(trips[city1], trips[city2], 'cityTo');
        } else {
          commonTrips = lodash.intersectionBy(commonTrips, trips[city2], 'cityTo');
        }
        if (commonTrips.length === 0) {
          return [];
        }
      }
    }
    for (let i = 0; i < commonTrips.length; i++) {
      if (!commonDestinations.includes(commonTrips[i].cityTo)) {
        commonDestinations.push(commonTrips[i].cityTo);
      }
    }
  } else {
    return [];
  }

  //Retirer les voyages qui ne font pas parti des destinations communes
  for (let i = 0; i < cities.length; i++) {
    let city = cities[i].name;
    if (city in trips) {
      trips[city] = trips[city].filter((trip) => {
        return commonDestinations.includes(trip.cityTo);
      });
    }
  }
  const destinations = [];
  for (let i = 0; i < commonDestinations.length; i++) {
    const prices = getTotalPrice(trips, commonDestinations[i]);
    destinations.push({
      name: commonDestinations[i],
      ...prices,
    });
  }
  destinations.sort(compare);
  return destinations;
};

export const searchTrips = (cities, dateFrom, dateTo, directTrip, returnTrip) => {
  const promises = [];
  return (dispatch) => {
    const formData = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      cities: cities,
    };
    // dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FORM_DATA', formData });
    dispatch({ type: 'LOADING' });
    const showFilter = false;
    dispatch({ type: 'CLICK_FILTER', showFilter });
    history.push('/destinations');

    // To calculate the time difference of two dates
    const differenceInTime = dateTo.getTime() - dateFrom.getTime();
    // To calculate the no. of days between two dates
    const differenceInDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));

    const dateFromStr = format(dateFrom, 'dd/MM/yyyy');
    const dateToStr = format(dateTo, 'dd/MM/yyyy');
    console.log(directTrip);
    let maxStopover = '2';
    if (directTrip) {
      maxStopover = '0';
    }
    let config = {
      headers: {
        accept: 'application/json',
        apikey: 'OZKMONJlN0ntClVlOy1Qv7dXRC4btk4f',
      },
    };

    const travelers = {};
    for (let i = 0; i < cities.length; i++) {
      travelers[cities[i].name] = cities[i].numberOfPeople;
      let promise;
      if (returnTrip) {
        promise = axios.get(
          `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&return_from=${dateToStr}&return_to=${dateToStr}&max_stopovers=${maxStopover}&flight_type=round&nights_in_dst_from=${differenceInDays}&nights_in_dst_to=${differenceInDays}&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft&ret_to_diff_airport=0&ret_from_diff_airport=0`,
          config
        );
      } else {
        promise = axios.get(
          `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&max_stopovers=${maxStopover}&flight_type=oneway&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft`,
          config
        );
      }

      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        const trips = {};
        //Construction d'un objet avec une liste de voyage
        for (let i = 0; i < results.length; i++) {
          const city = cities[i].name;
          let trips_by_city = [];
          if (typeof results[i].data.data[0] !== 'undefined') {
            trips_by_city = results[i].data.data.map((trip) => {
              const padingTrip = {
                cityFrom: trip.cityFrom,
                cityTo: trip.cityTo,
                price: trip.price,
                way: {
                  local_departure: trip.local_departure,
                  local_arrival: trip.local_arrival,
                  utc_departure: trip.utc_departure,
                  utc_arrival: trip.utc_arrival,
                },
                return: {},
                wayRoutes: getWayRoutes(trip.route, trip.cityTo),
                route: trip.route,
                returnRoutes: [],
                nightsInDest: trip.nightsInDest,
                duration: trip.duration,
                travelers: travelers[trip.cityFrom],
                token: trip.booking_token,
              };
              if (returnTrip) {
                const returnRoutes = getReturnRoutes(trip.route, trip.cityTo);
                padingTrip['returnRoutes'] = returnRoutes;
                padingTrip['return']['local_departure'] = getLocalDepartureDate(returnRoutes);
                padingTrip['return']['local_arrival'] = getLocalArrivalDate(returnRoutes);
                padingTrip['return']['utc_departure'] = getUtcDepartureDate(returnRoutes);
                padingTrip['return']['utc_arrival'] = getUtcArrivalDate(returnRoutes);
              }
              return padingTrip;
            });
          }
          trips[city] = trips_by_city;
        }
        const commonDestinations = getCommonDestinations(trips, cities);

        const carb = {};
        for (let index in cities) {
          let city = cities[index].name;
          for (let i = 0; i < trips[city].length; i++) {
            let route = trips[city][i].route;
            for (let i = 0; i < route.length; i++) {
              carb[route[i].flyFrom + '-' + route[i].flyTo] = 0;
            }
          }
        }
        const sandboxPromises = [];
        for (var code in carb) {
          let codes = code.split('-');
          let body = {
            IataCodes: codes,
            Passengers: 1,
          };

          sandboxPromises.push(
            axios.post(process.env.REACT_APP_C_LEVEL_ENDPOINT + `/calculate/flight`, body, {
              headers: {
                apikey: process.env.REACT_APP_C_LEVEL_KEY,
                'Content-Type': 'application/json',
              },
            })
          );
        }

        Promise.all(sandboxPromises)
          .then((results) => {
            for (let i = 0; i < results.length; i++) {
              const codes = JSON.parse(results[i].config.data).IataCodes;
              const key = codes[0] + '-' + codes[1];
              carb[key] = results[i].data.Co2PerPerson_kg;
            }
            for (let destination of commonDestinations) {
              const carbonFootprint = {};

              let carbonFootprintTotal = 0;

              for (let index in cities) {
                let city = cities[index].name;

                const tripsByCity = trips[city];

                let trip = tripsByCity.filter((trip) => {
                  return trip.cityTo === destination.name;
                })[0];

                let route = trip.route;
                carbonFootprint[city] = 0;
                for (let i = 0; i < route.length; i++) {
                  let carbonFootprintForFlight =
                    carb[route[i].flyFrom + '-' + route[i].flyTo] *
                    0.001102 *
                    cities[index].numberOfPeople;
                  carbonFootprint[city] += carbonFootprintForFlight;
                  carbonFootprintTotal += carbonFootprintForFlight;
                }
                carbonFootprint[city] = carbonFootprint[city].toFixed(3);
              }

              destination['carbonFootprint'] = carbonFootprint;

              destination['carbonFootprintTotal'] = carbonFootprintTotal.toFixed(3);
            }
            const data = {
              commonDestinations: commonDestinations,
              initialTrips: trips,
              trips,
              travelers,
              returnTrip,
              directTrip,
              carb,
            };

            dispatch({ type: 'SEARCH', data });
            dispatch({ type: 'SUCCESS' });
          })
          .catch((error) => {
            const data = {
              commonDestinations: commonDestinations,
              initialTrips: trips,
              trips,
              travelers,
              returnTrip,
              directTrip,
              // carb,
            };

            dispatch({ type: 'SEARCH', data });
            dispatch({ type: 'SUCCESS' });
          });
      })
      .catch((error) => {
        dispatch({ type: 'FAILURE' });
      });
  };
};

export const searchClassicTrips = (cities, dateFrom, dateTo, directTrip, returnTrip) => {
  const promises = [];
  return (dispatch) => {
    const formData = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      cities: cities,
    };
    // dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FORM_DATA', formData });
    dispatch({ type: 'LOADING' });
    const showFilter = false;
    dispatch({ type: 'CLICK_FILTER', showFilter });
    history.push('/destinations');

    // To calculate the time difference of two dates
    const differenceInTime = dateTo.getTime() - dateFrom.getTime();
    // To calculate the no. of days between two dates
    const differenceInDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));

    const dateFromStr = format(dateFrom, 'dd/MM/yyyy');
    const dateToStr = format(dateTo, 'dd/MM/yyyy');
    console.log(directTrip);
    let maxStopover = '2';
    if (directTrip) {
      maxStopover = '0';
    }
    let config = {
      headers: {
        accept: 'application/json',
        apikey: 'OZKMONJlN0ntClVlOy1Qv7dXRC4btk4f',
      },
    };

    const travelers = {};
    for (let i = 0; i < cities.length; i++) {
      travelers[cities[i].name] = cities[i].numberOfPeople;
      let promise;
      if (returnTrip) {
        promise = axios.get(
          `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&return_from=${dateToStr}&return_to=${dateToStr}&max_stopovers=${maxStopover}&flight_type=round&nights_in_dst_from=${differenceInDays}&nights_in_dst_to=${differenceInDays}&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft&ret_to_diff_airport=0&ret_from_diff_airport=0`,
          config
        );
      } else {
        promise = axios.get(
          `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&max_stopovers=${maxStopover}&flight_type=oneway&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft`,
          config
        );
      }

      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        const trips = {};
        //Construction d'un objet avec une liste de voyage
        for (let i = 0; i < results.length; i++) {
          const city = cities[i].name;
          let trips_by_city = [];
          if (typeof results[i].data.data[0] !== 'undefined') {
            trips_by_city = results[i].data.data.map((trip) => {
              const padingTrip = {
                cityFrom: trip.cityFrom,
                cityTo: trip.cityTo,
                price: trip.price,
                way: {
                  local_departure: trip.local_departure,
                  local_arrival: trip.local_arrival,
                  utc_departure: trip.utc_departure,
                  utc_arrival: trip.utc_arrival,
                },
                return: {},
                wayRoutes: getWayRoutes(trip.route, trip.cityTo),
                route: trip.route,
                returnRoutes: [],
                nightsInDest: trip.nightsInDest,
                duration: trip.duration,
                travelers: travelers[trip.cityFrom],
                token: trip.booking_token,
              };
              if (returnTrip) {
                const returnRoutes = getReturnRoutes(trip.route, trip.cityTo);
                padingTrip['returnRoutes'] = returnRoutes;
                padingTrip['return']['local_departure'] = getLocalDepartureDate(returnRoutes);
                padingTrip['return']['local_arrival'] = getLocalArrivalDate(returnRoutes);
                padingTrip['return']['utc_departure'] = getUtcDepartureDate(returnRoutes);
                padingTrip['return']['utc_arrival'] = getUtcArrivalDate(returnRoutes);
              }
              return padingTrip;
            });
          }
          trips[city] = trips_by_city;
        }
        const commonDestinations = getCommonDestinations(trips, cities);

        const carb = {};
        for (let index in cities) {
          let city = cities[index].name;
          for (let i = 0; i < trips[city].length; i++) {
            let route = trips[city][i].route;
            for (let i = 0; i < route.length; i++) {
              carb[route[i].flyFrom + '-' + route[i].flyTo] = 0;
            }
          }
        }
        const sandboxPromises = [];
        for (var code in carb) {
          let codes = code.split('-');
          let body = {
            IataCodes: codes,
            Passengers: 1,
          };

          sandboxPromises.push(
            axios.post(process.env.REACT_APP_C_LEVEL_ENDPOINT + `/calculate/flight`, body, {
              headers: {
                apikey: process.env.REACT_APP_C_LEVEL_KEY,
                'Content-Type': 'application/json',
              },
            })
          );
        }

        Promise.all(sandboxPromises)
          .then((results) => {
            for (let i = 0; i < results.length; i++) {
              const codes = JSON.parse(results[i].config.data).IataCodes;
              const key = codes[0] + '-' + codes[1];
              carb[key] = results[i].data.Co2PerPerson_kg;
            }
            for (let destination of commonDestinations) {
              const carbonFootprint = {};

              let carbonFootprintTotal = 0;

              for (let index in cities) {
                let city = cities[index].name;

                const tripsByCity = trips[city];

                let trip = tripsByCity.filter((trip) => {
                  return trip.cityTo === destination.name;
                })[0];

                let route = trip.route;
                carbonFootprint[city] = 0;
                for (let i = 0; i < route.length; i++) {
                  let carbonFootprintForFlight =
                    carb[route[i].flyFrom + '-' + route[i].flyTo] *
                    0.001102 *
                    cities[index].numberOfPeople;
                  carbonFootprint[city] += carbonFootprintForFlight;
                  carbonFootprintTotal += carbonFootprintForFlight;
                }
                carbonFootprint[city] = carbonFootprint[city].toFixed(3);
              }

              destination['carbonFootprint'] = carbonFootprint;

              destination['carbonFootprintTotal'] = carbonFootprintTotal.toFixed(3);
            }
            const data = {
              commonDestinations: commonDestinations,
              initialTrips: trips,
              trips,
              travelers,
              returnTrip,
              directTrip,
              carb,
            };

            dispatch({ type: 'SEARCH', data });
            dispatch({ type: 'SUCCESS' });
          })
          .catch((error) => {
            const data = {
              commonDestinations: commonDestinations,
              initialTrips: trips,
              trips,
              travelers,
              returnTrip,
              directTrip,
              // carb,
            };

            dispatch({ type: 'SEARCH', data });
            dispatch({ type: 'SUCCESS' });
          });
      })
      .catch((error) => {
        dispatch({ type: 'FAILURE' });
      });
  };
};

export const clickOnFilter = (showFilter) => {
  return (dispatch) => {
    showFilter = !showFilter;
    dispatch({ type: 'CLICK_FILTER', showFilter });
  };
};

export const doFilter = (fullFilter, trips, cities, carb) => {
  return (dispatch) => {
    let departureCities = Object.keys(fullFilter.departure);
    for (const city of departureCities) {
      let trips_by_city = trips[city];
      trips_by_city = trips_by_city.filter((trip) => {
        if (
          moment.utc(trip.way.local_departure).hours() >= fullFilter.departure[city].start &&
          moment.utc(trip.way.local_departure).hours() <= fullFilter.departure[city].end
        ) {
          return true;
        }
        return false;
      });
      trips[city] = trips_by_city;
    }

    let arrivalCities = Object.keys(fullFilter.return);
    for (const city of arrivalCities) {
      let trips_by_city = trips[city];
      trips_by_city = trips_by_city.filter((trip) => {
        if (
          moment.utc(trip.return.local_arrival).hours() >= fullFilter.return[city].start &&
          moment.utc(trip.return.local_arrival).hours() <= fullFilter.return[city].end
        ) {
          return true;
        }
        return false;
      });
      trips[city] = trips_by_city;
    }
    const commonDestinations = getCommonDestinations(trips, cities);
    for (let destination of commonDestinations) {
      const carbonFootprint = {};

      let carbonFootprintTotal = 0;

      for (let index in cities) {
        let city = cities[index].name;
        console.log(city);
        const tripsByCity = trips[city];
        console.log(tripsByCity);
        let trip = tripsByCity.filter((trip) => {
          return trip.cityTo === destination.name;
        })[0];
        let route = trip.route;
        carbonFootprint[city] = 0;
        for (let i = 0; i < route.length; i++) {
          let carbonFootprintForFlight =
            carb[route[i].flyFrom + '-' + route[i].flyTo] * 0.001102 * cities[index].numberOfPeople;
          carbonFootprint[city] += carbonFootprintForFlight;
          carbonFootprintTotal += carbonFootprintForFlight;
        }
        carbonFootprint[city] = carbonFootprint[city].toFixed(3);
      }

      destination['carbonFootprint'] = carbonFootprint;

      destination['carbonFootprintTotal'] = carbonFootprintTotal.toFixed(3);
    }
    const data = {
      commonDestinations,
      trips,
    };
    dispatch({ type: 'FILTER', data });
  };
};
