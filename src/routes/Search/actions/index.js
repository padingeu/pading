import axios from 'axios';
import lodash from 'lodash';

export const onClick = (cities, dateFrom, dateTo) => {
  dateFrom = dateFrom.toLocaleDateString()
  dateTo = dateTo.toLocaleDateString()
  const promises = []
  return dispatch => {
    let config = {
      headers: {
        accept: 'application/json',
        apikey: 'IKxLuAAkQC8WZ45VUByiK9SSetOFSjnL'
      }
    }
    for (let i = 0; i < cities.length; i++) {
      const promise = axios.get(`https://kiwicom-prod.apigee.net/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFrom}&date_to=${dateTo}&flight_type=round&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft`, config)
      promises.push(promise)
    }
    const trips = []
    Promise.all(promises)
      .then((results) => {
        for (let i = 0; i < results.length; i++) {
          const trip = results[i].data.data.map(trip => (
            {
              [trip.cityFrom]: {
                cityFrom: trip.cityFrom,
                cityTo: trip.cityTo,
                price: trip.price,
                local_departure: trip.local_departure,
                local_arrival: trip.local_arrival
              }
            }
            ))
          trips.push(trip)
        }
        //Recuperer une liste des destinations communes
        let commonTrips;
        for (let i = 1 ; i < trips.length; i++) {
          commonTrips = lodash.intersectionBy(trips[i - 1], trips[i], 'cityTo');
        }

        const commonDestinations = commonTrips.map((item) => {
          return Object.keys(item)[0]
        })
        console.log(commonDestinations)
         //Pour chaque ville garder seulement les destinations commune
        for(let i = 0; i < trips.length; i++) {
          trips[i] = filterTrips(trips[i], commonDestinations)
        }
        const data = {
          commonDestinations: commonDestinations,
          trips: trips
        }
        dispatch({ type: 'SEARCH', data })
      })
  }
}

const filterTrips = (trips, commonDestinations) => {
  trips.filter( (trip) => {
    return commonDestinations.includes(trip.city)
  })

}
