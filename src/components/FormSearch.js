import React from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../components/_FormSearch.scss';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';

export default class FormSearch extends React.Component {

  state = { cities: ["", ""] }

  addCity = event => {
    event.preventDefault();
    this.setState({ cities: [...this.state.cities, ""]});
  };

  handleChange(city, index) {
    this.state.cities[index] = city.target.value;
    this.setState({ cities: this.state.cities });
  };

  handleRemove = (event, index) => {
    event.preventDefault();
    this.state.cities.splice(index, 1);
    this.setState({ cities: this.state.cities });
  };

  handleReset = event => {
    event.preventDefault();
    this.setState({ cities: [""] });
  };



  render() {

    return (
      <div className="travel-form">
        <p>Where do you travel from?</p>

        <Form>

          <FormGroup check className="travel-checkbox">
            <Label check>
              <Input type="checkbox"/>{' '}
              Plane
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Train
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Bus
            </Label>
          </FormGroup>
          <FormGroup className="add-remove-city">
            <label>
              <button onClick={this.addCity}>+</button>
              <button onClick={this.handleReset}>Reset</button>
            </label>
          </FormGroup>

          <FormGroup>

            {
              this.state.cities.map((city, index) => {

                return (
                  <div className="cities-input" key={index}>
                    <label>
                      <LocationSearchInput
                        value={city}
                        onChange={(city) => this.handleChange(city, index)}
                      />
                    </label>
                    <label>
                      <button onClick={this.handleRemove}>-</button>
                    </label>
                  </div>

                )
              })
            }

          </FormGroup>

        </Form>
      </div>
    );

  };
};
