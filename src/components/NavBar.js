import React from 'react';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import onClickOutside from 'react-onclickoutside';
import Popup from 'reactjs-popup';
import logoPading from '../img/logo-pading.png';
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
                        <img src={logoPading} alt="Pading find the perfect place to meet" />
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-menu-items">
                        <Popup
                            modal
                            trigger={
                                <button className="button-navbar">SIMPLE TRIP</button>
                            }
                        >
                            <div className="simple-trip-popup">
                                <h3>COMING SOON</h3>
                                <p><b>Book flights and trains to any destination of your choice</b></p>
                                <img src={padingClassic} alt="screenshot of Pading classic travel search" className="screenshot-app" />
                            </div>
                        </Popup>
                        <Link to="/" onClick={this.props.scrollUp}>
                            <button className="button-navbar">HALFWAY TRIP</button>
                        </Link>
                        <Link to="/" onClick={this.props.scrollUp}>
                            <button className="button-navbar">BLOG</button>
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
                        {this.state.dropDownMenuOpen ? <i class="fas fa-times fa-lg"></i> : <i class="fas fa-bars fa-lg"></i>}
                    </button>
                </div>
                {this.state.dropDownMenuOpen &&
                <div className="navbar-dropdown-menu">
                    <ul>
                        <li>
                            <Popup
                                modal
                                trigger={
                                    <button className="button-navbar">SIMPLE TRIP</button>
                                }
                                className="simple-trip-popup"
                            >
                                <div className="simple-trip-popup">
                                <h3>COMING SOON</h3>
                                <p><b>Book flights and trains to any destination of your choice</b></p>
                                <img src={padingClassic} alt="screenshot of Pading classic travel search" className="screenshot-app" />
                            </div>
                            </Popup>
                        </li>
                        <li>
                            <Link to="/" onClick={this.props.scrollUp}>
                                <button className="button-navbar">HALFWAY TRIP</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={this.props.scrollUp}>
                                <button className="button-navbar">BLOG</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={this.props.scrollUp}>
                                <button className="button-navbar">QUESTIONS</button>
                            </Link>
                        </li>
                        <li>
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
                        </li>
                    </ul>
                </div>}
            </div>
        )
    }
}

export default onClickOutside(Navbar);