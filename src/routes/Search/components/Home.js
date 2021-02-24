import React from 'react';
import './_Home.scss';
import NavBar from '../../../components/NavBar';
import Why from './Why';
import How from './How';
import Simple from './Simple';
import MyClimate from './MyClimate';
import Footer from '../../../components/Footer';

export default class Home extends React.Component {
  scrollUp() {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <div>
        <NavBar searchTrips={this.props.searchTrips} />
        <Why />
        <How />
        <Simple />
        <MyClimate />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
