import React from 'react';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import onClickOutside from 'react-onclickoutside';
import logoPading from '../img/logo-pading.png';
import simpleLogoPading from '../img/simple-logo-pading.png';

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
        </div>
      </div>
    )
  }
}

export default onClickOutside(Navbar);