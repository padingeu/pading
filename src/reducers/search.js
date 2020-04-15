const initialState = {
  commonDestinations: []
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
      console.log('loading')
      return Object.assign({}, state, { isLoading: true, success: false, failure: false });
    case 'SUCCESS':
      console.log('success')
      return Object.assign({}, state, { isLoading: false, success: true, failure: false });
    case 'FAILURE':
      console.log('failure')
      return Object.assign({}, state, { isLoading: false, success: false, failure: true });
    default:
      return state;
  }
};

export default search;
