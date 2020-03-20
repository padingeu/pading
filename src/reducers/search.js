const initialState = {
  numberOfResults: 0,
  commonDestinations: []
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return Object.assign({}, state, action.data);
    case 'CLEAR_SEARCH':
      return initialState;
    default:
      return state;
  }
};

export default search;
