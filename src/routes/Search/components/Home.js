import React from 'react';
import './_Home.scss';
import NavBar from '../../../components/NavBar';
import Banner from '../../../components/Banner';
import Why from './Why';
import How from './How';
import Simple from './Simple';
import Planet from './Planet';
import Footer from '../../../components/Footer';

export default class Home extends React.Component {
  state = { isHomePage: true }
  scrollUp() {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <div>
        <NavBar scrollUp={this.scrollUp} />
        <Banner searchTrips={this.props.searchTrips} isHomePage={this.state.isHomePage} />
        <Why />
        <How />
        <Simple />
        <Planet />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
