import React from 'react';
import './_Cards.scss';


export default function Cards() {
    return (
        <div className="wrapper">
            <div className="cards-trip">
                <div className="container">

                    <div className="row">

                        <div className="col-xs-6 col-md-4 col-lg-4">
                            <div className="card-trip">
                                <img src="https://www.guiajando.com/wp-content/uploads/2018/02/budapest_parlamento-1000x580.jpg" alt="booking tickets and traveling to budapest"/>
                                <div className="card-trip-infos">
                                    <div className="card-trip-city">
                                        <h5>Budapest</h5>
                                    </div>
                                    <div className="card-trip-pricing">
                                        <h5>140€</h5>
                                        <p>35€ / traveller</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
            
                        <div className="col-xs-6 col-md-4 col-lg-4">
                            <div className="card-trip">
                                <img src="https://res.cloudinary.com/hzekpb1cg/image/upload/c_fill,h_410,w_800,f_auto/s3/public/prod/s3fs-public/Italy_Napoli.jpg" alt="booking tickets and traveling to napoli"/>
                                <div className="card-trip-infos">
                                    <div className="card-trip-city">
                                        <h5>Napoli</h5>
                                    </div>
                                    <div className="card-trip-pricing">
                                        <h5>200€</h5>
                                        <p>50€ / traveller</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-6 col-md-4 col-lg-4">
                            <div className="card-trip">
                                <img src="https://cdn.getyourguide.com/img/tour_img-2266912-146.jpg" alt="booking tickets and traveling to bilbao"/>
                                <div className="card-trip-infos">
                                    <div className="card-trip-city">
                                        <h5>Bilbao</h5>
                                    </div>
                                    <div className="card-trip-pricing">
                                        <h5>220€</h5>
                                        <p>55€ / traveller</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div className="col-xs-6 col-md-4 col-lg-4">
                            <div className="card-trip">
                                <img src="http://img2.rtve.es/v/4881968/" alt="booking tickets and traveling to cordoba"/>
                                <div className="card-trip-infos">
                                    <div className="card-trip-city">
                                        <h5>Córdoba</h5>
                                    </div>
                                    <div className="card-trip-pricing">
                                        <h5>260€</h5>
                                        <p>65€ / traveller</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div className="col-xs-12 col-md-8 col-lg-8">
                            <div className="cards-trip-content">
                                <h4>You are travelling alone?</h4>
                                <h4>Enjoy Pading to find the best travel offers!</h4>
                                <p>If you are a lonely traveller, let us bring to you with some creative new ideas for your next trip</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}