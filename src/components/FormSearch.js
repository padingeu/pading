import React from 'react';
import LocationSearchInput from './LocationSearchInput';
import DatesPicker from './DatesPicker';
import '../components/_FormSearch.scss';
import { Input, Label, Form, FormGroup } from 'reactstrap';

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



  handleReset = event => {
    event.preventDefault();
    this.setState({ cities: [""] });
  };



  render() {

    return (
      <div className="travel-form">

          <p>Where do you travel from?</p>
          
        <Form>
          <DatesPicker />
          <button name="button" type="submit" className="btn btn-flat">
              <i className="fas fa-search"></i> Search
          </button>
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
          <LocationSearchInput/>

        </Form>

        

      </div>
    );

  };
};
