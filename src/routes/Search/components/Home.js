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
        <div className="hello">
          <div className="banner">
            <div className="formsearch-home">
              <FormSearch searchTrips={this.props.searchTrips} isHomePage={this.state.isHomePage} />
            </div>
            <div className="map-home">
              {this.props.search.commonDestinations.citiesFrom > 1 && (
                <Map
                  citiesFrom={this.props.search.cities}
                  citiesTo={this.props.search.commonDestinations}
                />
              )}
              Carte
            </div>
          </div>
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
