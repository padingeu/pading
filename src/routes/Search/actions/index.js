import axios from 'axios';
import lodash from 'lodash';
import { history } from '../../../index';
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

    Promise.all(promises)
      .then((results) => {
        const trips = {}
        //Construction d un objet avec une liste de voyage
        for (let i = 0; i < results.length; i++) {
          const city = results[i].data.data[0].cityFrom
          const trips_by_city = results[i].data.data.map(trip => {
            return {
              cityFrom: trip.cityFrom,
              cityTo: trip.cityTo,
              price: trip.price,
              local_departure: trip.local_departure,
              local_arrival: trip.local_arrival
            }
          })
          trips[city] = trips_by_city
        }

        const cityIntersection = (a1, a2) => lodash.intersectionBy(a1, a2, 'cityTo');

        //Recuperer une liste des destinations communes
       let commonTrips;
       for (let i = 1; i < cities.length; i++) {
          let city1 = cities[i].name
          let city2 = cities[i - 1].name
          if (commonTrips) {
              commonTrips = cityIntersection(
                commonTrips,
                cityIntersection(trips[city1], trips[city2]),
            );
          } else {
            commonTrips = cityIntersection(trips[city1], trips[city2]);
          }
        }
        const commonDestinations = commonTrips.map((item) => {
          return item.cityTo
        })


        //Retirer les voyages qui ne font pas parti des destinations communes
        for (let i = 0; i < cities.length; i++) {
          let city = cities[i].name
          trips[city] = trips[city].filter((trip) => {
            return commonDestinations.includes(trip.cityTo)
          })
          trips[city] = trips[city].slice(0, 20)
        }

        const data = {
          commonDestinations,
          trips
        }
        dispatch({ type: 'SEARCH', data })
        history.push('/results')
      })
  }
}

//const filterTrips = (trips, commonDestinations) => {
  //trips.filter((trip) => {
    //return commonDestinations.includes(trip.city)
  //})

//}
