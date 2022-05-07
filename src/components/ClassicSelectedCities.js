import React from 'react';
import '../components/_ClassicSelectedCities.scss';

const ClassicSelectedCities = ({
  cities,
  removeCity,
}) => {
  return (
    <div className="classic-cities-departure">
  
      {cities.map((city, index) => {
        return (
          <div key={index}>
            <div className="classic-city-div">   
              <div className="classic-city-departure" key={index}>
                <div className="classic-city-departure-name">{city.name}</div>
                <i
                  className="fas fa-times-circle"
                  onClick={(event) => removeCity(event, index)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassicSelectedCities;