import React from 'react';
import FormSearch from './FormSearch';
import './_Banner.scss';
import backgroundDesktop from '../img/banner/cats-traveling-banner-desktop.jpg';
import backgroundTablet from '../img/banner/cats-traveling-banner-tablet.jpg';
import backgroundMobile from '../img/banner/cats-traveling-banner-mobile.jpg';


export default class Banner extends React.Component {

  render() {
    return (
      <div>
        <div className="banner">
            <img className="banner-background-desktop" src={backgroundDesktop} alt="cats-traveling" />
            <img className="banner-background-tablet" src={backgroundTablet} alt="cats-traveling" />
            <img className="banner-background-mobile" src={backgroundMobile} alt="cats-traveling" />
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
    );
  }
}