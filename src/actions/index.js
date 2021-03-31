import axios from 'axios';
import lodash from 'lodash';
import { history } from '../index';
import Geocode from 'react-geocode';

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

export const searchTrips = (cities, dateFrom, dateTo, stopTrip, travelType) => {
  console.log(travelType)
  const promises = [];
  return (dispatch) => {
    const formData = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      cities: cities,
    };
    dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FORM_DATA', formData });
    dispatch({ type: 'LOADING' });
    history.push('/results');

    // To calculate the time difference of two dates
    const differenceInTime = dateTo.getTime() - dateFrom.getTime();
    // To calculate the no. of days between two dates
    const differenceInDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));
    const dateFromStr = dateFrom.toLocaleDateString();
    const dateToStr = dateTo.toLocaleDateString();
    let maxStopover = '2';
    if (stopTrip === 'Direct') {
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
      const promise = axios.get(
        `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&return_from=${dateToStr}&return_to=${dateToStr}&max_stopovers=${maxStopover}&flight_type=round&nights_in_dst_from=${differenceInDays}&nights_in_dst_to=${differenceInDays}&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft&ret_to_diff_airport=0&ret_from_diff_airport=0`,
        config
      );
      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        const trips = {};
        //Construction d'un objet avec une liste de voyage
        for (let i = 0; i < results.length; i++) {
          if (typeof results[i].data.data[0] !== 'undefined') {
            const city = results[i].data.data[0].cityFrom;
            const trips_by_city = results[i].data.data.map((trip) => {
              return {
                cityFrom: trip.cityFrom,
                cityTo: trip.cityTo,
                price: trip.price,
                local_departure: trip.local_departure,
                local_arrival: trip.local_arrival,

                route: trip.route,
              };
            });
            trips[city] = trips_by_city;
          }
        }
        //Recuperer une liste des destinations communes
        let commonTrips = [];
        if (cities.length === 1 && cities[0].name in trips) {
          commonTrips = trips[cities[0].name];
        } else {
          for (let i = 1; i < cities.length; i++) {
            let city1 = cities[i - 1].name;
            let city2 = cities[i].name;
            if (commonTrips.length > 0) {
              commonTrips = lodash.intersectionBy(commonTrips, trips[city2], 'cityTo');
            } else {
              commonTrips = lodash.intersectionBy(trips[city1], trips[city2], 'cityTo');
            }
          }
        }

        const commonDestinations = [];
        for (let i = 0; i < commonTrips.length; i++) {
          if (!commonDestinations.includes(commonTrips[i].cityTo)) {
            commonDestinations.push(commonTrips[i].cityTo);
          }
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
        const destinationsWithPrice = [];
        let locationPromises = [];
        commonDestinations.forEach((destinationName) => {
          // locationPromises.push(Geocode.fromAddress(destinationName));
        });

        Promise.all(locationPromises).then((responses) => {
          for (let i = 0; i < responses.length; i++) {
            const { lat, lng } = responses[i].results[0].geometry.location;
            destinationsWithPrice.push({
              name: commonDestinations[i],
              lat: lat,
              lng: lng,
              prices: getTotalPrice(trips, commonDestinations[i]),
            });
          }
          const data = {
            commonDestinations,
            trips,
            travelers,
            destinationsWithPrice,
            travelType
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
