import React from 'react';
import './_DetailsResultsPopup.scss';
import DetailsResults from './DetailsResults.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    borderRadius: '1rem',
    backgroundColor: 'theme.palette.background.paper',
  },
}));

export default function DetailsResultsPopup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {Object.keys(props.trips).map((city) => {
            return <Tab key={city} label={'from ' + city} {...a11yProps(city)} className="tab-active"/>;
          })}
        </Tabs>
      </AppBar>
      {Object.keys(props.trips).map((city, index) => {
        return (
          <TabPanel className="details-results" value={value} index={index} key={index}>
            <DetailsResults
              key={city}
              destination={props.destination}
              cityFrom={city}
              trip={props.trips[city].filter((trip) => trip.cityTo === props.destination)[0]}
              returnTrip={props.returnTrip}
              carbonFootprint={props.carbonFootprint[city]}
            />
          </TabPanel>
        );
      })}
    </div>
  );
}
