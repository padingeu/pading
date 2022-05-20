import React from 'react';
import { withTranslation } from 'react-i18next';
import FormSearch from './FormSearch';
import './_Banner.scss';
import Popup from 'reactjs-popup';
import padingClassic from '../img/pading_classic_screenshot.png';
import backgroundDesktop from '../img/banner/cats-traveling-banner-desktop.jpg';
import backgroundTablet from '../img/banner/cats-traveling-banner-tablet.jpg';
import backgroundVerticalTablet from '../img/banner/cats-traveling-banner-vertical-tablet.jpg';
import backgroundMobile from '../img/banner/cats-traveling-banner-mobile.jpg';
import backgroundSmallMobile from '../img/banner/cats-traveling-banner-small-mobile.jpg';

class Banner extends React.Component {
  render() {

    return (
      <div>
        <div className="banner">
          <img className="banner-background-desktop" src={backgroundDesktop} alt={this.props.t("bannerImglt")} />
          <img className="banner-background-tablet" src={backgroundTablet} alt={this.props.t("bannerImgAlt")} />
          <img
            className="banner-background-vertical-tablet"
            src={backgroundVerticalTablet}
            alt="cats-traveling"
          />
          <img className="banner-background-mobile" src={backgroundMobile} alt={this.props.t("bannerImgAlt")} />
          <img
            className="banner-background-small-mobile"
            src={backgroundSmallMobile}
            alt={this.props.t("bannerImgAlt")}
          />
          {this.props.isHomePage ? (
            <div className="banner-content">
              <h1>{this.props.t("mainTitle")}</h1>
              <p>
                {this.props.t("mainDescription1")}
                <br className="br"/>
                {this.props.t("mainDescription2")}
              </p>
              <div className="pading-mode">
                <button className="pading-mode-halfway">{this.props.t("halfwayMode")}</button>
                <Popup modal trigger={<button className="pading-mode-classic">{this.props.t("classicMode")}</button>}>
                  {(closePopup) => (
                    <div className="popup">
                      <button className="close-popup" onClick={closePopup}>
                        <i className="fas fa-times fa-lg"></i>
                      </button>
                      <div className="simple-trip-popup">
                        <h3>{this.props.t("simpleTripPopupTitle")}</h3>
                        <p>
                          {this.props.t("simpleTripPopupDescription1")}
                          <br />
                          {this.props.t("simpleTripPopupDescription2")}
                        </p>
                        <img
                          src={padingClassic}
                          alt={this.props.t("classicModeImgAlt")}
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

export default withTranslation()(Banner);