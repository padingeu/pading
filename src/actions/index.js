import axios from 'axios';


export const onClick = (cities, dateFrom, dateTo) => {
  console.log(dateFrom)
  console.log(dateTo)
  const promises = []
  return (dispatch) => {
    let config = {
      headers: {
        accept: 'application/json',
        apikey: 'IKxLuAAkQC8WZ45VUByiK9SSetOFSjnL'
      }
    }
    for(let i = 0; i < cities.length; i++) {
      const promise = axios.get(`https://kiwicom-prod.apigee.net/v2/search?fly_from=${cities[i].coordinates}&date_from=05%2F12%2F2019&date_to=25%2F12%2F2019&return_from=20%2F12%2F2019&flight_type=round&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft`, config)

      promises.push(promise)
    }
    const trips = []
    Promise.all(promises)
          .then((results) => {
            for(let i = 0; i < results.length; i++) {
              const cityName = cities[i].name
              const response = results[i].data.data.map(trip => ({ cityFrom: trip.cityFrom, cityTo: trip.cityTo, price: trip.price }))
              const tripsByCity = {}
              tripsByCity[cityName] = response        
              trips.push(tripsByCity)
            }
            console.log("All done", trips);
            
            dispatch({ type: 'SEARCH', trips })
          })
          .catch((e) => {
              // Handle errors here
          });
  }
}
