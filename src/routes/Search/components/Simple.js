import React from 'react';
import catsBasketGif from '../img/catsbasket.gif';
import catsBasketVideo from '../img/catsbasket.mp4';
import './_Simple.scss';


export default function Simple() {

    let isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
    
    return (
        <div className="wrapper">
            <div className="simple-solution">
                <div className="simple-solution-gif">
                { isIOS ? 
                    <div><img src={catsBasketGif} className="catsbasket" width="350px"/></div>
                    :
                    <video className="catsbasket" autoPlay="autoplay" loop muted playsInline width="350px">
                        <source src={catsBasketVideo} />
                    </video>
                    }                    
                </div>
                <div className="simple-solution-content">
                    <h2>Simple solution for complex connections !</h2>
                    <br/>
                    <p><b>Planning an Erasmus meeting, joining friends living abroad, gathering with family</b></p>
                    <p><b>Pading is a simple solution built to bring you closer to each other</b></p>
                </div>
            </div>
        </div>
    )
}