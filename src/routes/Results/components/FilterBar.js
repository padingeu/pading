import React from 'react';
import Slider from '@material-ui/core/Slider';
import './_Filter.scss';

function valuetext(value) {
  return `${value}`;
}

export default function Filter(props) {
  const [value, setValue] = React.useState([0, 23]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.filter(newValue, props.city, props.type);
  };

  return (
    <div>
      <div>
        <div className="timerange">
          <p>
            {value[0]}h00 - {value[1]}h00
          </p>
        </div>
      </div>
      <Slider
        min={0}
        max={23}
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
