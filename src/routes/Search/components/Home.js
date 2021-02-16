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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <div>
        <NavBar />
        <Why />
        <How />
        <Simple />
        <MyClimate />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
