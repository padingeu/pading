import React from 'react';
import './_Airlines.scss';
import easyjet from '../img/easyjet.png';
import vueling from '../img/vueling.png';
import airfrance from '../img/airfrance.png';
import ryanair from '../img/ryanair.png';
import transavia from '../img/transavia.png';
import airitalia from '../img/airitalia.png';
import norwegian from '../img/norwegian.png';


export default function Airlines() {
    return (
        <div className="wrapper">
             <div className="airlines-list">
                <img src={easyjet} alt="logo easyjet"/>
                <img src={vueling} alt="logo vueling"/>
                <img src={airfrance} alt="logo airfrance"/>
                <img src={ryanair} alt="logo ryanair"/>
                <img src={transavia} alt="logo transavia"/>
                <img src={airitalia} alt="logo airitalia"/>
                <img src={norwegian} alt="logo norwegian"/>
                <span>+450</span>
            </div>
        </div>
    )
}