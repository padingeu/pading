import React from 'react';
import './_Home.scss';
import NavBar from '../../../components/NavBar';
import FormSearch from '../../../components/FormSearch';
import Map from '../../../components/Map';
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
        <div className="banner">
          <div className="formsearch">
            <FormSearch searchTrips={this.props.searchTrips} />
          </div>
          <div className="map-home">Carte</div>
        </div>
        <Why />
        <How />
        <Simple />
        <MyClimate />
        <Cards />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
