import React from 'react';
import FormSearch from './FormSearch';
import './_Banner.scss';
import padingClassic from '../img/pading_classic_screenshot.png';
import banner from '../img/travel-in-plane.jpg';
import Popup from 'reactjs-popup';


export default class Banner extends React.Component {

  render() {
    return (
      <div>
        <div className="banner">
          <div className="banner-content-formsearch">
            <img src={banner} alt="cats traveling and gathering" />
            {this.props.isHomePage ?
              <div className="banner-content">
                <h1>TRAVEL TO GATHER</h1>
                <p>Fill in your friends' departure cities and your own, travel to common destinations and meet halfway !</p>
                <FormSearch
                  searchTrips={this.props.searchTrips}
                  isHomePage={this.props.isHomePage}
                />
              </div>
            : ''}
          </div>
        </div>
      </div>
    );
  }
}