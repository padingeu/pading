import React from 'react';
import '../components/_SelectedCities.scss';

const SelectedCities = ({
  cities,
  removeCity,
  addTraveler,
  removeTraveler,

}) => {
  return (
    <div className="cities-departure">
      {console.log(cities)}
      {cities.map((city, index) => {
        return (
          <div key={index}>
            <div className="city-div">
              <div className="number-of-people-edit">
                <div className="number-of-people">
                  <i className="fas fa-user-friends fa-xs"></i>
                  <h5>{city.numberOfPeople}</h5>
                </div>

                <div className="people-number-change">
                  <i
                    className="fas fa-minus-circle"
                    onClick={(event) => removeTraveler(event, city)}
                  ></i>
                  <i
                    className="fas fa-plus-circle"
                    onClick={(event) => addTraveler(event, city)}
                  ></i>
                </div>
              </div>
              <div className="city-departure" key={index}>
                <div className="city-departure-name">{city.name}</div>
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

export default SelectedCities;
