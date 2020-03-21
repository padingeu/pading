import React from 'react';
import App from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import Home from './routes/Search/containers/HomeContainer';
import Results from './routes/Results/containers/ResultsContainer';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
<<<<<<< HEAD
        <Route exact path="/" component={FormSearch} /> {/* app = home */}
        <Route path="/results" component={Results} />
=======
        <Route exact path='/' component={Home}/> {/* app = home */}
        <Route path='/results' component={Results}/>
>>>>>>> formsearch-resultspage
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
