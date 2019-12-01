const initialState = {
  numberOfResults: 0
}

const search = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH':
        return Object.assign({}, state, {
          trips: action.trips
        })
      default:
        return state
    }
  }
  
  export default search