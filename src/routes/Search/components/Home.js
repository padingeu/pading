import React from 'react';
import NavBar from '../../../components/NavBar';
import './_Home.scss';
import mappoints from '../img/mappoints.png';
import FormSearch from '../../../components/FormSearch';
import Why from './Why';
import How from './How';
import Simple from './Simple';
import Cards from './Cards';
import MyClimate from './MyClimate';
import Footer from '../../../components/Footer';

export default class Home extends React.Component {
  state = {
    isHomePage: true,
  };

  scrollUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="hello">
          <div className="banner">
            <FormSearch searchTrips={this.props.searchTrips} isHomePage={this.state.isHomePage} />
          </div>
          <div className="earth">
            <img className="earth-img" src={mappoints} alt="meeting of friends thanks to travel" />
          </div>
        </div>
        <Why />
        <How />
        <Simple />
        <Cards />
        <MyClimate />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
