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
import Classic from './routes/Classic/containers/ClassicContainer';
import Blog from './routes/Blog/components/Blog';
import BlogPost from './routes/Blog/components/BlogPost';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
      <Route exact path="/" component={Home} />
      <Route path="/destinations" component={Results} />
      <Route path="/classic" component={Classic} />
      <Route path="/blog" component={Blog} />
      <Route path="/blogpost/:id" component={BlogPost} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
