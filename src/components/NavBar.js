import React from 'react';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import onClickOutside from 'react-onclickoutside';
import Popup from 'reactjs-popup';
import Faq from './Faq';
import logoPading from '../img/logo-pading.png';
import simpleLogoPading from '../img/simple-logo-pading.png';
import padingClassic from '../img/pading_classic_screenshot.png';


class Navbar extends React.Component {
  state = {
      dropDownMenuOpen: false
  }

  dropDownMenu = () => {
      this.setState({ dropDownMenuOpen: !this.state.dropDownMenuOpen })
  }

  handleClickOutside = () => {
      this.setState({ dropDownMenuOpen: false });
  };

  render() {
  return (
      <div className="navbar">
          <div className="navbar-brand">
            <Link to="/" onClick={this.props.scrollUp}>
              <img className="logo-mobile" src={simpleLogoPading} alt="Pading find the perfect place to meet" />
              <img className="logo-desktop"src={logoPading} alt="Pading find the perfect place to meet" />
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-menu-items">
              <a
                className="button-navbar"
                href="https://trello.com/b/NoQieqmu/pading-public-roadmap"
                rel="noopener noreferrer"
                target="_blank"
              >
                Roadmap
              </a>
              <Link to="/blog" target="_blank" onClick={this.props.scrollUp}>
                <button className="button-navbar">Blog</button>
              </Link>
              <div className="navbar-social">
                  <a
                    href="https://www.facebook.com/Pading-103563007939325/?view_public_for=103563007939325"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/pading.eu/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
              </div>
            </div>
            <button className="dropdown-navbar" onClick={() => this.dropDownMenu()}>
                {this.state.dropDownMenuOpen ? <i className="fas fa-times fa-lg"></i> : <i className="fas fa-bars fa-lg"></i>}
            </button>
          </div>
          {this.state.dropDownMenuOpen &&
          <div className="navbar-dropdown-menu">
            <Popup
              modal
              trigger={<button className="button-navbar">Classic</button>}
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
              <Link to="/" onClick={this.props.scrollUp} className="button-navbar">
                Travel halfway
              </Link>
              <a
                className="button-navbar"
                href="https://trello.com/b/NoQieqmu/pading-public-roadmap"
                rel="noopener noreferrer"
                target="_blank"
              >
                Roadmap
              </a>
              <Link to="/" onClick={this.props.scrollUp} className="button-navbar">
                Blog
              </Link>
              <Popup
                modal
                trigger={
                  <button to="/" onClick={this.props.scrollUp} className="button-navbar">Questions</button>
                }
                className="simple-trip-popup"
              >
                {closePopup => (
                <div className="popup">
                   <button className="close-popup" onClick={closePopup}><i class="far fa-times-circle fa-2x"></i></button>
                  <Faq />
                </div>
                )}
              </Popup>
              <div className="navbar-social">
                <a
                  href="https://www.facebook.com/Pading-103563007939325/?view_public_for=103563007939325"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/pading.eu/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
          </div>}
      </div>
    )
  }
}

export default onClickOutside(Navbar);