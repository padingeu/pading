import React from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../components/_FormSearch.scss';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';

export default class FormSearch extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      numberCitiesDisplayed: 3,
      cities: {
        city1: {
          name: '',
          visibility: true
        },
        city2: {
          name: '',
          visibility: true
        },
        city3: {
          name: '',
          visibility: true
        },
        city4: {
          name: '',
          visibility: false
        },
        city5: {
          name: '',
          visibility: false
        }
      }
    };

    this.handleCityFieldChange = this.handleCityFieldChange.bind(this);
    this.search = this.search.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  handleCityFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  search = () => {


  };

  showMore = () => {
    const numberCitiesDisplayed = this.state.numberCitiesDisplayed + 1
    const city = 'city' + numberCitiesDisplayed
    let cities = { ...this.state.cities }
    if (cities[city]) {
      cities[city].visibility = true;
      this.setState({
        cities,
        numberCitiesDisplayed
      });
    }

  };

  render() {
    return (

      <div className="travel-form">
        <p>Where do you travel from?</p>

        <Form>

          <FormGroup check className="travel-checkbox">
            <Label check>
              <Input type="checkbox" />{' '}
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

          <Button color="primary" onClick={this.showMore}>+</Button>
          <div className="cities-input">
            <Label>
              <LocationSearchInput />
            </Label>
          </div>
          <div>
            <Label>
              <Input type="text" name="city2" value={this.state.cities.city2.name} onChange={this.handleCityFieldChange} />
            </Label>
          </div>
          <div>
            <Label>
              <Input type="text" name="city3" value={this.state.cities.city3.name} onChange={this.handleCityFieldChange} />
            </Label>
          </div>
          {this.state.cities.city4.visibility &&
            <div>
              <Label>
                <Input type="text" name="city4" value={this.state.cities.city4.name} onChange={this.handleCityFieldChange} />
              </Label>
            </div>
          }
          {this.state.cities.city5.visibility &&
            <div>
              <Label>
                <Input type="text" name="city5" value={this.state.cities.city5.name} onChange={this.handleCityFieldChange} />
              </Label>
            </div>
          }
        </Form>
      </div>

        );
      }
}
