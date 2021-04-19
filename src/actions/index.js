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

const compare = (a, b) => {
  if (a.prices.totalPrice < b.prices.totalPrice) {
    return -1;
  }
  if (a.prices.totalPrice > b.prices.totalPrice) {
    return 1;
  }
  return 0;
};

const getGeolocalisationPromisesFromAws = (commonDestinations, locationPromises) => {
  const geolocalisations = [];
  commonDestinations.forEach((destinationName) => {
    //TODO get latlgt from aws
    geolocalisations.push(
      axios.get(
        `https://mocnu2fybd.execute-api.eu-west-1.amazonaws.com/prod/coordinates/${destinationName}`
      )
    );
  });
  return geolocalisations;
};

const getDepartureRoutes = (routes, cityTo) => {
  const departureRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].cityFrom === cityTo) {
      break;
    }
    departureRoutes.push(routes[i]);
  }
  return departureRoutes;
};

const routes = [];
routes.push({});

const getArrivalRoutes = (routes, cityTo) => {
  const arrivalRoutes = [];
  for (let i = routes.length - 1; i >= 0; i--) {
    if (routes[i].cityTo === cityTo) {
      break;
    }
    arrivalRoutes.push(routes[i]);
  }
  return arrivalRoutes.reverse();
};

export const searchTrips = (cities, dateFrom, dateTo, stopTrip, travelType) => {
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
                departureRoutes: getDepartureRoutes(trip.route, trip.cityTo),
                arrivalsRoutes: getArrivalRoutes(trip.route, trip.cityTo),
                nightsInDest: trip.nightsInDest,
                duration: trip.duration,
                travelers: travelers[trip.cityFrom],
                token: trip.booking_token,
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

        let commonDestinations = [];
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

        // commonDestinations = commonDestinations.slice(0, 2); //TODO temporaire
        let googlePromises = [];
        let destinationNames = [];
        const awsPromises = getGeolocalisationPromisesFromAws(commonDestinations);
        const destinationsWithPrice = [];
        Promise.all(awsPromises).then((responses) => {
          for (let i = 0; i < responses.length; i++) {
            //TODO if 200
            if (responses[i].status === 200) {
              destinationsWithPrice.push({
                name: commonDestinations[i],
                lat: responses[i].data.latitude,
                lng: responses[i].data.longitude,
                prices: getTotalPrice(trips, commonDestinations[i]),
              });
            } else if (responses[i].status === 204) {
              googlePromises.push(Geocode.fromAddress(commonDestinations[i]));
              destinationNames.push(commonDestinations[i]);
            }
          }
          Promise.all(googlePromises).then((responses) => {
            for (let i = 0; i < responses.length; i++) {
              const destinationName = destinationNames[i];
              const response = responses[i];
              const { lat, lng } = response.results[0].geometry.location;
              destinationsWithPrice.push({
                name: destinationName,
                lat: lat,
                lng: lng,
                prices: getTotalPrice(trips, destinationName),
              });
              axios
                .post(
                  `https://mocnu2fybd.execute-api.eu-west-1.amazonaws.com/prod/coordinates/${destinationName}`,
                  {
                    city: destinationName,
                    latitude: lat.toString(),
                    longitude: lng.toString(),
                  }
                )
                .catch((error) => {
                  console.log(error + destinationName);
                });
            }
            destinationsWithPrice.sort(compare);
            const data = {
              commonDestinations,
              trips,
              travelers,
              destinationsWithPrice,
              travelType,
            };
            dispatch({ type: 'SEARCH', data });
            dispatch({ type: 'SUCCESS' });
          });
        });
      })
      .catch((error) => {
        dispatch({ type: 'FAILURE' });
      });
  };
};
