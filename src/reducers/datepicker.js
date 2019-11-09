const initialState = {
  start: '',
  end: ''
}

const datepicker = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DATE':
        if(action.data.firstClick) {
          return Object.assign({}, state, {
            start: action.date
          })
        } else {
          return Object.assign({}, state, {
            end: action.date
          })
        }
       
      default:
        return state
    }
  }
  
export default datepicker