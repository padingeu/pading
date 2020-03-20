const initialState = {
  numberOfResults: 0,
  commonDestinations: []
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      console.log('search');
      return Object.assign({}, state, action.data);
    case 'CLEAR_SEARCH':
      console.log('clear search');
      return initialState;
    default:
      return state;
  }
};

export default search;
