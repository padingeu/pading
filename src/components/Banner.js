import React from 'react';
import FormSearch from './FormSearch';
import './_Banner.scss';
import padingClassic from '../img/pading_classic_screenshot.png';
import banner from '../img/10.jpg';
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