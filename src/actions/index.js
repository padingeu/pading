import axios from 'axios';
import _ from 'lodash';

export const onClick = (cities, dateFrom, dateTo) => {
  dateFrom = dateFrom.toLocaleDateString()
  dateTo = dateTo.toLocaleDateString()
  const promises = []
  return (dispatch) => {
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
    const tripsByCity = []
    Promise.all(promises)
      .then((results) => {
        for (let i = 0; i < results.length; i++) {
          const response = results[i].data.data.map(trip => ({ cityFrom: trip.cityFrom, cityTo: trip.cityTo, price: trip.price, local_departure: trip.local_departure, local_arrival: trip.local_arrival }))
          trips.push(response)
          const trip = {
          }
          trip[cities[0]] = response
          tripsByCity.push(trip)
        }
        const intersection = _.intersectionBy(trips[0], trips[1], 'cityTo');
        const commonDest = intersection.map((item) => {
          return {
            "destination": item.destination
          };
        })
        const data = {
          "commonDestinations": commonDest,
          trips: tripsByCity
        }
        console.log(data)
        dispatch({ type: 'SEARCH', data })
      })
  }
}
