import React from 'react';
import './_NavBar.scss';
import { Link } from "react-router-dom";
import logoPading from '../img/logo-pading.jpeg';

export default class Navbar extends React.Component {
  
    render() {
        return (
            <div className="navbar">
                <div className="navbar-brand">
                    <Link to="/" onClick={this.props.scrollToTop}>
                        <img src={logoPading} alt="Pading find the perfect place to meet" />
                    </Link>
                </div>
            </div>
        )
    }
}