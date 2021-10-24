import React from 'react';
import './_Planet.scss';
import earthPlanet from '../img/earth-planet.svg';


export default function Planet() {
    return (
        <div className="wrapper">
            <div className="myclimate">
                <div className="myclimate-content">
                    <h2><span className="focus-text"><span className="underline"></span>THINKING ABOUT</span><br/><span className="focus-text"><span className="underline"></span>THE PLANET !</span></h2>
                    <br/>
                    <p>Travelling is great, being aware of the ecological impact is essential</p>
                    <p>Pading calculates the climate impact of each journey so you can give your preference to low carbon footprint destinations and offset your Co2 emissions</p>
                    <p>Together we can make travel more eco-friendly !</p>
                </div>
                <img className="earth-image" alt="Earth planet with a cat thinking about ecology" src={earthPlanet}/>
            </div>
        </div>
    )
}
