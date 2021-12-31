import React from 'react';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import onClickOutside from 'react-onclickoutside';
import Popup from 'reactjs-popup';
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
      if (this.props.isHomePage) {
        window.scrollY < 20 ? this.setState({ navbarColorChange: "transparent" }) : this.setState({ navbarColorChange: "white" });
      } else {
        this.setState({ navbarColorChange: "white" });
      }
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
            <button className="pading-mode-active">
              Halfway
            </button>
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
        </div>
      </div>
    )
  }
}

export default onClickOutside(Navbar);