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
        <div className="airlines-list">
            <img src={easyjet} alt="logo easyjet" width="150px"/>
            <img src={vueling} alt="logo vueling" width="150px"/>
            <img src={airfrance} alt="logo airfrance" width="150px"/>
            <img src={ryanair} alt="logo ryanair" width="150px"/>
            <img src={transavia} alt="logo transavia" width="150px"/>
            <img src={airitalia} alt="logo airitalia" width="150px"/>
            <img src={norwegian} alt="logo norwegian" width="150px"/>
            <span>+450</span>
        </div>
    )
}