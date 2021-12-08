const initialState = {
  commonDestinations: [],
  trips: {},
  travelers: {},
  returnTrip: '',
  cities: [],
  showFilter: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return Object.assign({}, state, action.data);
    case 'FILTER':
      return Object.assign({}, state, action.data);
    case 'CLICK_FILTER':
      return Object.assign({}, state, action);
    case 'FORM_DATA':
      return Object.assign({}, state, action.formData);
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
