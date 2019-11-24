import axios from 'axios';


export const onClick = (cities) => {
  console.log('Make request for ')
  const iata = cities[0].iata
  return (dispatch) => {
    let config = {
      headers: {
        accept: 'application/json',
        apikey: 'IKxLuAAkQC8WZ45VUByiK9SSetOFSjnL'
      }
    }

    return axios.get(`https://kiwicom-prod.apigee.net/v2/search?fly_from=${iata}&date_from=05%2F12%2F2019&date_to=25%2F12%2F2019&return_from=20%2F12%2F2019&flight_type=round&adults=1&vehicle_type=aircraft`, config)
      .then((response) => {
        const trips = response.data.data.map(trip => ({ cityFrom: trip.cityFrom, cityTo: trip.cityTo, price: trip.price }))
        console.log(trips)
        dispatch({ type: 'SEARCH', trips })
      })
  }
}
