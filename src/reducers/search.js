const initialState = {
  numberOfResults: 0,
  commonDestinations: []
}

const search = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH':
        console.log('actions')
        console.log(action.data)
        return Object.assign({}, state, action.data)
      default:
        return state
    }
  }
  
  export default search