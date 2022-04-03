import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from '../i18n';
import LanguageChoice from './LanguageChoice';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import logoPading from '../img/logo-pading.png';
import simpleLogoPading from '../img/simple-logo-pading.png';

class Navbar extends React.Component {

  state = {
    lang: i18n.languages[0],
    showLanguageChoices: false
  }

  changeLanguage = (ln) => {
    return () => {
      i18n.changeLanguage(ln);
      this.setState({ lang: ln})
      this.setState({ showLanguageChoices: false })
    }
  }

  setLanguageChoices = (event) => {
    event.preventDefault();
    this.setState({ showLanguageChoices: !this.state.showLanguageChoices })
  }

  handleClickOutside = () => {
    this.setState({ showLanguageChoices: false })
  }

  render() {
    return (
        <div className="navbar">
          <div className="navbar-brand">
            <Link to="/" onClick={this.props.scrollUp}>
              <img className="logo-mobile" src={simpleLogoPading} alt={this.props.t("padingLogoAlt")} />
              <img className="logo-desktop"src={logoPading} alt={this.props.t("padingLogoAlt")} />
            </Link>
          </div>
          <div className="navbar-menu">
           <LanguageChoice
            lang={this.state.lang}
            showLanguageChoices={this.state.showLanguageChoices}
            setLanguageChoices={this.setLanguageChoices}
            changeLanguage={this.changeLanguage}
            handleClickOutside={this.handleClickOutside}
           />
          </div>
        </div>
      )
    }
}

export default withTranslation()(Navbar);