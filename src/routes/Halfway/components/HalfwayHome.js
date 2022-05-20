import React from 'react';
import './_Home.scss';
import NavBar from '../../../components/NavBar';
import HalfwayBanner from './HalfwayBanner';
import Airlines from '../../../components/Airlines';
import Why from './Why';
import How from './How';
import Simple from './Simple';
import Planet from './Planet';
import Footer from '../../../components/Footer';

export default class HalfwayHome extends React.Component {
  state = { isHalfWaySearchPage: true }

  scrollUp() {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <div>
        <div className="overlay"></div>
        <NavBar scrollUp={this.scrollUp} isHalfWaySearchPage={this.state.isHalfWaySearchPage} />
        <HalfwayBanner searchTrips={this.props.searchTrips} isHalfWaySearchPage={this.state.isHalfWaySearchPage} />
        <Airlines />
        <Why />
        <How />
        <Simple />
        <Planet />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}