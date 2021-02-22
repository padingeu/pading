import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function SwitchesSize() {
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <FormGroup className="switch-button">
        <div>normal</div>
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
      />
      <div>normal</div>
    </FormGroup>
  );
}
