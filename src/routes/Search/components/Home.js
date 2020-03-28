import React from 'react';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';

export default class Home extends React.Component {
  state = {
    isHomePage: true
  };

  render() {
    return (
      <div>
        <NavBar />
        <FormSearch searchTrips={this.props.searchTrips} isHomePage={this.state.isHomePage} />
      </div>
    );
  }
}
