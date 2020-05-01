import React from 'react';
import './_MyClimate.scss';


export default function Simple() {
    return (
        <div className="wrapper">
            <div className="myclimate">
                <div className="myclimate-content">
                    <h4>Trying to be eco responsible</h4>
                    <p>If like us, you face inner conflict between your passion for travelling and your concerns for ecology, we recommand you to compensate your Co2 emissions with our partner <a href="https://co2.myclimate.org/en/flight_calculators/new" target="blank">myClimate.org</a></p>
                    <a href="https://co2.myclimate.org/en/flight_calculators/new" target="blank">
                    <button className="myclimate-btn-blue">My Climate</button></a>
                </div>
                <div className="myclimate-img">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Myclimate_201x_logo.svg/1200px-Myclimate_201x_logo.svg.png" alt="offseting travel co2 emissions with myclimate" width="350px" />
                </div>
            </div>
        </div>
    )
}