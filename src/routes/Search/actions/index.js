import axios from 'axios';
import lodash from 'lodash';
import { history } from '../../../index';
export const onClick = (cities, dateFrom, dateTo) => {

  // To calculate the time difference of two dates 
  var differenceInTime = dateTo.getTime() - dateFrom.getTime();

  // To calculate the no. of days between two dates 
  var differenceInDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));
  console.log('differenceInDays')
  console.log(differenceInDays)
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
      const promise = axios.get(`https://kiwicom-prod.apigee.net/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFrom}&date_to=${dateFrom}&return_from=${dateTo}&max_stopovers=2&flight_type=round&nights_in_dst_from=${differenceInDays}&nights_in_dst_to=${differenceInDays}&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft`,
        config)
      promises.push(promise)
    }

    Promise.all(promises)
      .then((results) => {
        const trips = {}
        //Construction d un objet avec une liste de voyage
        for (let i = 0; i < results.length; i++) {
          if (typeof results[i].data.data[0] !== 'undefined') {
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

        }
        console.log(trips)
        //Recuperer une liste des destinations communes
        let commonTrips = [];
        for (let i = 1; i <= cities.length; i++) {
          let city1 = cities[i - 1].name
          if (cities.length !== 1) {
            let city2 = cities[i].name
            commonTrips = lodash.intersectionBy(trips[city1], trips[city2], 'cityTo');
          } else {
            console.log(trips)
            console.log(trips[city1])
            commonTrips = trips[city1];
          }

        }
        console.log(commonTrips)
        const commonDestinations = commonTrips.map((item) => {
          return item.cityTo
        })
        console.log(commonDestinations)
        //Retirer les voages qui ne font pas parti des destinations communes
        for (let i = 0; i < cities.length; i++) {
          let city = cities[i].name
          if (city in trips) {
            trips[city] = trips[city].filter((trip) => {
              return commonDestinations.includes(trip.cityTo)
            })
          }

        }

        const data = {
          commonDestinations: commonDestinations,
          trips: trips
        }
        console.log(data)
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
