import axios from 'axios';


export const onClick = (cities) => {
  
    return (dispatch) => {
        return axios.get(`https://api.skypicker.com/flights?fly_type=round&fly_from=city:MAD&to=&dateFrom=20/11/2019&return_from=24/11/2019&sort=price&partner=picky`)
          .then((response) => {
            dispatch({ type: 'SEARCH', response })
          })
      }
    }
  