import React from 'react';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import logoPading from '../img/logo-pading.png';
import padingClassic from '../img/pading_classic_screenshot.png';


export default class Navbar extends React.Component {
  
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
                                    <button>CLASSIC (SOON)</button>
                                }
                            >
                                <h3>COMING SOON</h3>
                                <p><b>Book flights and trains to any destination of your choice</b></p>
                                <img src={padingClassic} alt="screenshot of Pading classic travel search" className="screenshot-app" />
                            </Popup>
                        <Link to="/" onClick={this.props.scrollUp}>
                            <button className="active-mode">PADING MODE</button>
                        </Link>
                        </div>
                        </div>
            </div>
        )
    }
}