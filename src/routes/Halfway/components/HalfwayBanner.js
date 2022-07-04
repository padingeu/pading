import React from 'react';
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import HalfwayFormSearch from './HalfwayFormSearch';
import './_HalfwayBanner.scss';
import Popup from 'reactjs-popup';
import padingClassic from '../../..//img/pading_classic_screenshot.png';
import backgroundDesktop from '../../../img/banner/cats-traveling-banner-desktop.jpg';
import backgroundTablet from '../../../img/banner/cats-traveling-banner-tablet.jpg';
import backgroundVerticalTablet from '../../../img/banner/cats-traveling-banner-vertical-tablet.jpg';
import backgroundMobile from '../../../img/banner/cats-traveling-banner-mobile.jpg';
import backgroundSmallMobile from '../../../img/banner/cats-traveling-banner-small-mobile.jpg';



class HalfwayBanner extends React.Component {

  nextPath(path) {
    this.props.history.push(path);
  }

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
          {this.props.isHalfWaySearchPage ? (
            <div className="banner-content">
              <h1>{this.props.t("halfwayTitle")}</h1>
              <p>
                {this.props.t("halfwayDescription1")}
                <br className="br"/>
                {this.props.t("halfwayDescription2")}
              </p>
              <div className="pading-mode">
                <button className="pading-mode-active">{this.props.t("halfwayMode")}</button>
                <button className="pading-mode-disable" onClick={() => this.nextPath('/classic')}>{this.props.t("classicMode")}</button>
              </div>
              <HalfwayFormSearch searchTrips={this.props.searchTrips} isHalfWaySearchPage={this.props.isHalfWaySearchPage} />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HalfwayBanner));