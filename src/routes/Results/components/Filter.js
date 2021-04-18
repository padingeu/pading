import React from 'react';
import Slider from '@material-ui/core/Slider';
import './_Filter.scss';

function valuetext(value) {
  return `${value}`;
}

export default function Filter() {
  const [value, setValue] = React.useState([0, 24]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <div className="timerange">
          <p>
            from {value[0]}h00 to {value[1]}h00
          </p>
        </div>
      </div>
      <Slider
        min={0}
        max={24}
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
