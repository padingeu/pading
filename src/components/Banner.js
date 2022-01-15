import React from 'react';
import FormSearch from './FormSearch';
import './_Banner.scss';
import Popup from 'reactjs-popup';
import padingClassic from '../img/pading_classic_screenshot.png';
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
                <p>Fill in your friends' departure cities and your own,<br/>travel to common destinations and meet halfway !</p>
                <div className="pading-mode">
                  <button className="pading-mode-active">
                    HALFWAY
                  </button>
                  <Popup
                    modal
                    trigger={<button className="pading-mode-disable">CLASSIC</button>}
                  >
                  {closePopup => (
                    <div className="popup">
                      <button className="close-popup" onClick={closePopup}><i class="fas fa-times fa-lg"></i></button>
                      <div className="simple-trip-popup">
                        <h3>- COMING SOON -</h3>
                        <p>Book any trip easily and calmly to the destination of your choice</p>
                        <img src={padingClassic} alt="screenshot of Pading classic travel search" className="screenshot-app" />
                      </div>
                    </div>)}
                  </Popup>
                </div>
                <FormSearch
                  searchTrips={this.props.searchTrips}
                  isHomePage={this.props.isHomePage}
                />
                {console.log(this.props.dispplayFromWhereScreen)}
              </div>
            : ''}
 
        </div>
      </div>
    );
  }
}