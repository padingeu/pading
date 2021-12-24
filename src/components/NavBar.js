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
      dropDownMenuOpen: false,
      navbarColorChange: "transparent"
  }

  dropDownMenu = () => {
      this.setState({ dropDownMenuOpen: !this.state.dropDownMenuOpen })
  }

  handleClickOutside = () => {
      this.setState({ dropDownMenuOpen: false });
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      window.scrollY < 500 ? this.setState({ navbarColorChange: "transparent" }) : this.setState({ navbarColorChange: "white" });
      console.log("hello")
    });
  }

  render() {
  return (
      <div className="navbar" style={{backgroundColor: this.state.navbarColorChange}}>
        <div className="navbar-brand">
          <Link to="/" onClick={this.props.scrollUp}>
            <img className="logo-mobile" src={simpleLogoPading} alt="Pading find the perfect place to meet" />
            <img className="logo-desktop"src={logoPading} alt="Pading find the perfect place to meet" />
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-menu-items">
            <Link to="/" onClick={this.props.scrollUp} className="pading-mode-active">
              Halfway
            </Link>
            <Popup
              modal
              trigger={<button className="pading-mode">Classic</button>}
            >
            {closePopup => (
              <div className="popup">
                <button className="close-popup" onClick={closePopup}><i className="far fa-times-circle fa-2x"></i></button>
                <div className="simple-trip-popup">
                  <h3>BOOK ANY TRIP EASILY AND CALMLY<br/>- COMING SOON -</h3>
                  <p><b>Flights and trains to any destination of your choice</b></p>
                  <img src={padingClassic} alt="screenshot of Pading classic travel search" className="screenshot-app" />
                </div>
              </div>)}
            </Popup>
          </div>
          <button className="dropdown-navbar" onClick={() => this.dropDownMenu()}>
              {this.state.dropDownMenuOpen ? <i className="fas fa-times fa-lg"></i> : <i className="fas fa-bars fa-lg"></i>}
          </button>
        </div>
        {this.state.dropDownMenuOpen &&
        <div className="navbar-dropdown-menu">
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
                <button className="close-popup" onClick={closePopup}><i className="far fa-times-circle fa-2x"></i></button>
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