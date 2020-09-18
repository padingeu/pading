import React from 'react';
import './_Cards.scss';

export default function Cards() {
  return (
    <div className="wrapper">
      <div className="cards-trip">
        <div className="container" id="cities">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <div className="card-trip" id="budapest">
                <img
                  src="https://www.guiajando.com/wp-content/uploads/2018/02/budapest_parlamento-1000x580.jpg"
                  alt="booking tickets and traveling to budapest"
                />
                <div className="card-trip-infos">
                  <div className="card-trip-city-pricing">
                    <div className="card-trip-city">
                      <h4>Budapest</h4>
                    </div>
                    <div className="card-trip-pricing">
                      <h4>78€</h4>
                    </div>
                  </div>
                  <div className="carbon-footprint">
                    <p>
                      <i class="fas fa-cloud"></i> 1.825 t
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-3">
              <div className="card-trip" id="naples">
                <img
                  src="https://res.cloudinary.com/hzekpb1cg/image/upload/c_fill,h_410,w_800,f_auto/s3/public/prod/s3fs-public/Italy_Napoli.jpg"
                  alt="booking tickets and traveling to napoli"
                />
                <div className="card-trip-infos">
                  <div className="card-trip-city-pricing">
                    <div className="card-trip-city">
                      <h4>Naples</h4>
                    </div>
                    <div className="card-trip-pricing">
                      <h4>97€</h4>
                    </div>
                  </div>
                  <div className="carbon-footprint">
                    <p>
                      <i class="fas fa-cloud"></i> 2.003 t CO2
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-3">
              <div className="card-trip" id="amsterdam">
                <img
                  src="https://a.cdn-hotels.com/gdcs/production43/d534/1bd81a82-de7a-4cf5-a625-ca3cd27a3346.jpg"
                  alt="booking tickets and traveling to bilbao"
                />
                <div className="card-trip-infos">
                  <div className="card-trip-city-pricing">
                    <div className="card-trip-city">
                      <h4>Amsterdam</h4>
                    </div>
                    <div className="card-trip-pricing">
                      <h4>125€</h4>
                    </div>
                  </div>
                  <div className="carbon-footprint">
                    <p>
                      <i class="fas fa-cloud"></i> 1.399 t
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-3">
              <div className="card-trip" id="cordoba">
                <img
                  src="https://pix10.agoda.net/geo/city/3167/1_3167_02.jpg?s=1920x822"
                  alt="booking tickets and traveling to cordoba"
                />
                <div className="card-trip-infos">
                  <div className="card-trip-city-pricing">
                    <div className="card-trip-city">
                      <h4>Córdoba</h4>
                    </div>
                    <div className="card-trip-pricing">
                      <h4>154€</h4>
                    </div>
                  </div>
                  <div className="carbon-footprint">
                    <p>
                      <i class="fas fa-cloud"></i> 1.688 t
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
