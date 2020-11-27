import React, { useState } from 'react';
import './_DetailsResults.scss';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Divider } from 'material-ui';
import { DropdownDivider } from 'react-bootstrap/Dropdown';

const TabPanel = props => {
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showDetailsWay, setDetailsWay] = useState(false);
  const [showDetailsReturn, setDetailsReturn] = useState(false);

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
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel className="details-results" value={value} index={0}>
        <div className="details-results-travel">
          <div className="details-results-travel-way">
            <div className="details-results-travel-way-city">
              <h4>To Bilbao</h4>
            </div>
            <div className="details-results-travel-way-content">
              <div className="details-results-travel-way-content-section">
                <div className="un"></div>
                <div className="deux">
                  <div className="deux-bis"></div>
                  <i class="fas fa-calendar-day fa-lg"></i>
                  <h5>Wed Nov 11</h5>
                </div>
                <div className="trois">
                  <h5>12:30 PM</h5>
                </div>
                <div className="quatre">
                  <div className="quatre-bis"></div>
                  <div className="quatre-bis-bis"></div>
                  <div className="quatre-round"></div>
                  <h5>Manchester</h5>
                  <h6>Manchester airport (MAN)</h6>
                </div>
                <div className="cinq">
                </div>
                <div className="six">
                  <div className="six-bis"></div>
                  <i className="fas fa-user-friends fa-xs"></i>
                  <h6>one traveler</h6>
                </div>
                <div className="sept">
                  <img src="https://www.sebogo.fr/images/airlines/ori/FR.png" width="20px"></img>
                </div>
                <div className="huit">

                  <div className="huit-bis"></div>
                  <div className="huit-bis-bis"></div>
                  <div className="travel-company-time">
                    <i class="fas fa-plane fa-lg"></i>
                    <div className="travel-company">
                      <h5>Ryanair</h5>
                    </div>
                    <div className="travel-time">
                      <h5>2h 10m</h5>
                    </div>
                    <div
                      className="show-more-details"
                      onClick={() => setDetailsWay(!showDetailsWay)}
                    >
                      <i class="fas fa-angle-up fa-lg"></i>
                      <i class="fas fa-angle-down fa-lg"></i>
                    </div>
                  </div>

                {showDetailsWay ?
                  <div className="way-details">
                    <div className="way-details-connection-info">
                      <h5>Connection info</h5>
                    </div>
                    <div className="way-details-connection-info-content">
                      <div className="airline">
                        <div className="airline-logo">
                          <img src="https://www.sebogo.fr/images/airlines/ori/FR.png" width="15px"></img>
                          <h6>Airline</h6>
                        </div>
                        <div className="airline-response">
                          <h6>Ryanair</h6>
                        </div>
                      </div>
                      <div className="flight-number">
                        <div className="flight-number-logo">
                          <i class="fas fa-info-circle fa-lg"></i>
                          <h6>Flight no</h6>
                        </div>
                        <div className="flight-number-response">
                          <h6>FR7504</h6>
                        </div>
                      </div>
                    </div>
                  </div> : null
                }
                </div>
                <div className="neuf">
                  <h5>2:30 PM</h5>
                </div>
                <div className="dix">
                <div className="dix-bis"></div>
                  <div className="dix-bis-bis"></div>
                  <div className="dix-round"></div>
                  <h5>Bilbao</h5>
                  <h6>Bilbao airport (BIL)</h6>
                </div>
                <div className="onze">
                </div>
                <div className="douze">
                  <div className="douze-bis"></div>
                  <i class="fas fa-map-marker-alt fa-lg"></i>
                  <h5>Arrive at Bilbao</h5>
                  <h6>4 nights at the destination</h6>
                </div>
              </div>
              <footer className="details-results-travel-way-content-footer"></footer>
            </div>
          </div>
          <div className="details-results-travel-return">
            <div className="details-results-travel-return-city">
              <h4>To Manchester</h4>
            </div>
            <div className="details-results-travel-return-content">
              <div className="details-results-travel-return-content-section">
                <div className="un"></div>
                <div className="deux">
                  <div className="deux-bis"></div>
                  <i class="fas fa-calendar-day fa-lg"></i>
                  <h5>Thuesday Nov 17</h5>
                </div>
                <div className="trois">
                  <h5>10:15 PM</h5>
                </div>
                <div className="quatre">
                  <div className="quatre-bis"></div>
                  <div className="quatre-bis-bis"></div>
                  <div className="quatre-round"></div>
                  <h5>Bilbao</h5>
                  <h6>Bilbao airport (BIL)</h6>
                </div>
                <div className="cinq">
                </div>
                <div className="six">
                  <div className="six-bis"></div>
                  <i className="fas fa-user-friends fa-xs"></i>
                  <h6>one traveler</h6>
                </div>
                <div className="sept">
                  <img src="https://www.sebogo.fr/images/airlines/ori/FR.png" width="20px"></img>
                </div>
                <div className="huit">
                  <div className="huit-bis"></div>
                  <div className="huit-bis-bis"></div>
                  <div className="travel-company-time">
                    <i class="fas fa-plane fa-lg"></i>
                    <div className="travel-company">
                      <h5>Ryanair</h5>
                    </div>
                    <div className="travel-time">
                      <h5>2h 10m</h5>
                    </div>
                    <div
                      className="show-more-details"
                      onClick={() => setDetailsReturn(!showDetailsReturn)}
                    >
                      <i class="fas fa-angle-up fa-lg"></i>
                      <i class="fas fa-angle-down fa-lg"></i>
                    </div>
                  </div>
                  {showDetailsReturn ?
                  <div className="return-details">
                    <div className="return-details-connection-info">
                      <h5>Connection info</h5>
                    </div>
                    <div className="return-details-connection-info-content">
                      <div className="airline">
                        <div className="airline-logo">
                          <img src="https://www.sebogo.fr/images/airlines/ori/FR.png" width="15px"></img>
                          <h6>Airline</h6>
                        </div>
                        <div className="airline-response">
                          <h6>Ryanair</h6>
                        </div>
                      </div>
                      <div className="flight-number">
                        <div className="flight-number-logo">
                          <i class="fas fa-info-circle fa-lg"></i>
                          <h6>Flight no</h6>
                        </div>
                        <div className="flight-number-response">
                          <h6>FR7412</h6>
                        </div>
                      </div>
                    </div>
                  </div> : null
                }
                </div>
                <div className="neuf">
                  <h5>12:25 AM</h5>
                </div>
                <div className="dix">
                <div className="dix-bis"></div>
                  <div className="dix-bis-bis"></div>
                  <div className="dix-round"></div>
                  <h5>Manchester</h5>
                  <h6>Manchester airport (MAN)</h6>
                </div>
                <div className="onze">
                </div>
                <div className="douze">
                  <div className="douze-bis"></div>
                  <i class="fas fa-map-marker-alt fa-lg"></i>
                  <h5>Come back to Manchester</h5>
                  <h6>Welcome home!</h6>
                </div>
              </div>
              <footer className="details-results-travel-way-content-footer"></footer>
            </div>
          </div>
        </div>
        <div className="details-results-share-book">
          <div className="details-results-share">
            <button>
              <i class="fas fa-share fa-xl"></i>
            </button>
            <h4>Share</h4>
          </div>
          <div className="details-results-price-book">
            <div className="details-results-price">
              <h4>94€</h4>
            </div>
            <button className="details-results-book">
              Book tickets
            </button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
       
      </TabPanel>
      <TabPanel value={value} index={2}>
       
      </TabPanel>
      <TabPanel value={value} index={3}>
        
      </TabPanel>
      <TabPanel value={value} index={4}>
       
      </TabPanel>
      <TabPanel value={value} index={5}>
      
      </TabPanel>
      <TabPanel value={value} index={6}>
       
      </TabPanel>
    </div>
  );
}
