const search = (state = [], action) => {
    switch (action.type) {
      case 'SEARCH':
        return [
          ...state
        ]
      default:
        return state
    }
  }
  
  export default search