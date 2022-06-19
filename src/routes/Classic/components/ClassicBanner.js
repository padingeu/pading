import React from 'react';
import { withTranslation } from 'react-i18next';
import ClassicFormSearch from './ClassicFormSearch';
import './_ClassicBanner.scss';
import Popup from 'reactjs-popup';
import padingClassic from '../../../img/pading_classic_screenshot.png';
import backgroundDesktop from '../../../img/banner/cats-traveling-banner-desktop.jpg';
import backgroundTablet from '../../../img/banner/cats-traveling-banner-tablet.jpg';
import backgroundVerticalTablet from '../../../img/banner/cats-traveling-banner-vertical-tablet.jpg';
import backgroundMobile from '../../../img/banner/cats-traveling-banner-mobile.jpg';
import backgroundSmallMobile from '../../../img/banner/cats-traveling-banner-small-mobile.jpg';

class ClassicBanner extends React.Component {
  render() {
    return (
      <div>
        <div className="banner">
          <img
            className="banner-background-desktop"
            src={backgroundDesktop}
            alt={this.props.t('bannerImglt')}
          />
          <img
            className="banner-background-tablet"
            src={backgroundTablet}
            alt={this.props.t('bannerImgAlt')}
          />
          <img
            className="banner-background-vertical-tablet"
            src={backgroundVerticalTablet}
            alt="cats-traveling"
          />
          <img
            className="banner-background-mobile"
            src={backgroundMobile}
            alt={this.props.t('bannerImgAlt')}
          />
          <img
            className="banner-background-small-mobile"
            src={backgroundSmallMobile}
            alt={this.props.t('bannerImgAlt')}
          />
          {this.props.isClassicSearchPage ? (
            <div className="banner-content">
              <h1>BOOK YOUR FLIGHT</h1>
              <p>Simply and calmly book your next flight to wherever your next adventure is.</p>
              <div className="pading-mode">
                <button className="pading-mode-active">{this.props.t('halfwayMode')}</button>
                <Popup
                  modal
                  trigger={
                    <button className="pading-mode-disable">{this.props.t('classicMode')}</button>
                  }
                >
                  {(closePopup) => (
                    <div className="popup">
                      <button className="close-popup" onClick={closePopup}>
                        <i className="fas fa-times fa-lg"></i>
                      </button>
                      <div className="simple-trip-popup">
                        <h3>{this.props.t('simpleTripPopupTitle')}</h3>
                        <p>
                          {this.props.t('simpleTripPopupDescription1')}
                          <br />
                          {this.props.t('simpleTripPopupDescription2')}
                        </p>
                        <img
                          src={padingClassic}
                          alt={this.props.t('classicModeImgAlt')}
                          className="screenshot-app"
                        />
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              <ClassicFormSearch
                searchClassicTrips={this.props.searchClassicTrips}
                isClassicSearchPage={this.props.isClassicSearchPage}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(ClassicBanner);
