const initialState = {
  commonDestinations: [],
  trips: {},
  travelers: {},
  destinationsWithPrice: [],
  travelType: '',
  cities: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return Object.assign({}, state, action.data);
    case 'FORM_DATA':
      return Object.assign({}, state, action.formData);
    case 'CLEAR_SEARCH':
      return initialState;
    case 'LOADING':
      return Object.assign({}, state, { isLoading: true, success: false, failure: false });
    case 'SUCCESS':
      return Object.assign({}, state, { isLoading: false, success: true, failure: false });
    case 'FAILURE':
      return Object.assign({}, state, { isLoading: false, success: false, failure: true });
    default:
      return state;
  }
};

export default search;
