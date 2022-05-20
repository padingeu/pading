import React from 'react';
import App from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import HalfwayHome from './routes/Halfway/containers/HalfwayHomeContainer';
import HalfwayResults from './routes/Results/containers/HalfwayResultsContainer';
import ClassicHome   from './routes/Classic/containers/ClassicHomeContainer';
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
      <Route exact path="/" component={HalfwayHome} />
      <Route path="/destinations" component={HalfwayResults} />
      <Route path="/classic" component={ClassicHome} />
      <Route path="/blog" component={Blog} />
      <Route path="/blogpost/:id" component={BlogPost} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
