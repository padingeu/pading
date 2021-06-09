import React from 'react';
import './_How.scss';


export default function How() {
    return (
        <div className="wrapper">
            <div className="how-to-use-it">
                <div className="how-to-use-it-title">
                    <h2>HOW TO PLAN MY TRIP ?</h2>
                </div>
                <div className="how-to-use-it-content">

                    <div className="how-to-use-it-content-card">           
                        <div className="how-to-use-it-number">
                            <h2>1</h2>
                        </div>
                        <div className="how-to-use-it-details">
                            <h3>SELECT YOUR DATES</h3>
                            <p><b>Fill in your travel dates, one-way/return</b></p>
                        </div>
                    </div>
                    <div className="how-to-use-it-content-card">
                        <div className="how-to-use-it-number">
                            <h2>2</h2>
                        </div>
                        <div className="how-to-use-it-details">
                            <h3>TELL US WHERE YOUR JOURNEY BEGINS</h3>
                            <p><b>Enter all departure cities you and your friends/family are coming from</b></p>
                        </div>
                    </div>
                    <div className="how-to-use-it-content-card">
                        <div className="how-to-use-it-number">
                            <h2>3</h2>
                        </div>
                        <div className="how-to-use-it-details">
                            <h3>EXPLORE ALL DESTINATIONS</h3>
                            <p><b>Explore all common destinations that match your own departure cities</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}