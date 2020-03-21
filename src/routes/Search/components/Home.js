import React from 'react';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <FormSearch />
      </div>
    )
  }
}
