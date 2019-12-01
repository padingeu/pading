import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,  applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers'
import FormSearch from './routes/Search/containers/FormSearchContainer'
import Results from './routes/Results/containers/ResultsContainer';
import { BrowserRouter, Route } from 'react-router-dom'

const store = createStore(rootReducer, 
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
))

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path='/' component={FormSearch}/> {/* app = home */}
      <Route exact path='/results' component={Results}/> 
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)