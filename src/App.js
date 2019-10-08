import React from 'react';
import './components/_App.scss';
import FormSearch from './containers/FormSearch';
import DatesPicker from './containers/DatesPicker';

const App = () => (
  <div className="container">
    <div className="banner">
      <DatesPicker />
      <FormSearch />
    </div>
  </div>
)

export default App
