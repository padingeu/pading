import React from 'react';
import './_MyClimate.scss';


export default function Simple() {
    return (
        <div className="wrapper">
            <img src="https://common.crowdfarming.com/uploaded-images/1595413996783-e14e18b4-2ea8-4719-8c58-a5ef2e1cabe2.svg" alt="earth planet" width="100%"></img>
            <div className="myclimate">
                <div className="myclimate-content">
                    <h2>We love our planet</h2>
                    <br/>
                    <p><b>Offsetting carbon footprint to make travel more eco-friendly</b></p>
                    <p><b>Pading calculates the climate impact of each destination so you can give your preference to low carbon footprint destination and compensate your Co2 emissions</b></p>
                </div>
                <div className="myclimate-img">
                <i className="fas fa-globe-europe"></i>
                </div>
            </div>
        </div>
    )
}
