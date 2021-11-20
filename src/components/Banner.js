import React from 'react';
import './_Banner.scss';
import FormSearch from './FormSearch';
import catsTraveling from '../img/cats-traveling-and-gathering.png';
import padingClassic from '../img/pading_classic_screenshot.png';
import Popup from 'reactjs-popup';
import friendsTogether from '../img/friends-together.png';
import bannerDesktopLarge from '../img/banner-desktop-large.svg';
import bannerDesktop from '../img/banner-desktop.svg';
import bannerTabletLarge from '../img/banner-tablet-large.svg';
import bannerTablet from '../img/banner-tablet.svg';
import bannerMobileLarge from '../img/banner-mobile-large.svg';
import bannerMobile from '../img/banner-mobile.svg';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Banner extends React.Component {

  render() {
    return (
      <div>
        <div className="banner">
          <div className="banner-content-formsearch">
            {this.props.isHomePage ?
              <div className="banner-content">
                <div className="banner-img">
                  <img src={catsTraveling} alt="cats traveling and gathering" />
                </div>
                <h1>TRAVEL TO GATHER</h1>
                <div className="pading-mode">
                  <button className="pading-mode-btn-active">Halfway</button>
                    <Popup
                      modal
                      trigger={<button className="pading-mode-btn">Classic</button>}
                    >
                      {closePopup => (
                        <div className="popup">
                          <button className="close-popup" onClick={closePopup}><i class="far fa-times-circle fa-2x"></i></button>
                          <div className="simple-trip-popup">
                            <h3>BOOK ANY TRIP EASILY AND CALMLY<br/>- COMING SOON -</h3>
                            <p><b>Flights and trains to any destination of your choice</b></p>
                            <img src={padingClassic} alt="screenshot of Pading classic travel search" className="screenshot-app" />
                          </div>
                        </div>
                      )}
                  </Popup>
                </div>
                <p>Fill in your friends' departure cities and your own, travel to common destinations and meet halfway !</p>
              </div>
            : ''}
            <FormSearch
              searchTrips={this.props.searchTrips}
              isHomePage={this.props.isHomePage}
            />

          </div>
        </div>
      </div>
    );
  }
}