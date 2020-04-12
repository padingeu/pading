const initialState = {
  numberOfResults: 0,
  commonDestinations: []
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      console.log(action)
      return Object.assign({}, state, action.data);
    case 'FORM_DATA':
      console.log(action)
      return Object.assign({}, state, action.formData);
    case 'CLEAR_SEARCH':
      return initialState;
    default:
      return state;
  }
};

export default search;