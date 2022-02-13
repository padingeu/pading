import React from 'react';
import FormSearch from './FormSearch';
import './_Banner.scss';
import Popup from 'reactjs-popup';
import padingClassic from '../img/pading_classic_screenshot.png';
import backgroundDesktop from '../img/banner/cats-traveling-banner-desktop.jpg';
import backgroundTablet from '../img/banner/cats-traveling-banner-tablet.jpg';
import backgroundVerticalTablet from '../img/banner/cats-traveling-banner-vertical-tablet.jpg';
import backgroundMobile from '../img/banner/cats-traveling-banner-mobile.jpg';
import backgroundSmallMobile from '../img/banner/cats-traveling-banner-small-mobile.jpg';

export default class Banner extends React.Component {
  render() {
    return (
      <div>
        <div className="banner">
          <img className="banner-background-desktop" src={backgroundDesktop} alt="cats-traveling" />
          <img className="banner-background-tablet" src={backgroundTablet} alt="cats-traveling" />
          <img
            className="banner-background-vertical-tablet"
            src={backgroundVerticalTablet}
            alt="cats-traveling"
          />
          <img className="banner-background-mobile" src={backgroundMobile} alt="cats-traveling" />
          <img
            className="banner-background-small-mobile"
            src={backgroundSmallMobile}
            alt="cats-traveling"
          />
          {this.props.isHomePage ? (
            <div className="banner-content">
              <h1>TRAVEL TO GATHER</h1>
              <p>
                Fill in your friends' departure cities and your own.
                <br />
                We will find the best journeys to meet halfway !
              </p>
              <div className="pading-mode">
                <button className="pading-mode-active">Halfway</button>
                <Popup modal trigger={<button className="pading-mode-disable">Classic</button>}>
                  {(closePopup) => (
                    <div className="popup">
                      <button className="close-popup" onClick={closePopup}>
                        <i className="fas fa-times fa-lg"></i>
                      </button>
                      <div className="simple-trip-popup">
                        <h3>- COMING SOON -</h3>
                        <p>
                          Book any trip easily and calmly
                          <br />
                          to the destination of your choice
                        </p>
                        <img
                          src={padingClassic}
                          alt="screenshot of Pading classic travel search"
                          className="screenshot-app"
                        />
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              <FormSearch searchTrips={this.props.searchTrips} isHomePage={this.props.isHomePage} />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
