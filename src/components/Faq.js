import React from 'react';
import './_Faq.scss';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '200ox',
    display: 'flex',
    'text-align': 'center',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Faq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>WHY PADING IS SO USEFUL ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>Pading is the only travel app organiser that allows you to find all common destinations where to meet from multi departure cities</p>
              <ul>
                <li><p>Andy and Juli are leaving from Munich and Frankfurt</p></li>
                <li><p>Filippo is leaving from Florence</p></li>
                <li><p>Eilidh is leaving from Glasgow</p></li>
                <li><p>Violaine, Ludi, Louis and Dimitri are leaving from Paris</p></li>
              </ul>
              <p>Pading searches for all existing travel combinations to meet in a same place and the cheapest destinations for the whole team are highlighted</p>

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>THE CHEAPEST PRICE REALLY ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>We work with our partner Kiwi to enjoy the 520 billion different route combinations of low-cost flights and very soon we will integrate trains journey in Europe as well</p>
            <p>Based on this huge quantity of data, we calculate the cheapest routes to go to your next meeting point</p>
            <p>Pading do the job for you. Now you just have to select the next place you would like to meet with your friends or family and book your tickets</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>USING PADING IS TIME SAVING, RIGHT ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>Without Pading, organizing the next meeting with your long-distance friends or family can be rather complicated:</p>
            <ul>
              <li><p>Proposing a destination</p></li>
              <li><p>Looking at all the travel possibilities and all the prices for each people</p></li>
              <li><p>Proposing an other destination if this one does not match everyone's criteria</p></li>
              <li><p>Do the same again and again until we are good</p></li>
            </ul>
            <br/>
            <p>With Pading, it looks like this:</p>
            <ul>
              <li><p>Fill the dates and enter the multiple departure cities</p></li>
              <li><p>Select your common destination among the cheapest ones</p></li>
            </ul>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>WHAT TRANSPORT CAN BE BOOKED ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>For now, we only consider air journeys but the train arrives soon !</p>
            <p>Our ambition is to redesign completely the travel organising experience so be prepared to discover more and more travel options</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>WHAT ABOUT ECOLOGY ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>This is our biggest dilemma: facilitating travel and acting positively for the planet</p>
            <p>We do not intend to invent the electric or hydrogen plane, but we do want to make people aware of the pollution generated by travel and encourage them to offset their carbon footprint.</p>
            <p>Thus, we calcultate the climate impact of each destination and empower each travel to directly offset his co2 emissions</p>
            <p>We are also keen to offer train journeys as it is much more environmentally friendly</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>HOW PADING CAN BE FREE ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>Pading is a user interface. The booking is made on Kiwi secure Website that offers very good guarantee protecting customers from schedule change, delays and cancellations.</p>
            <p>We work as an affiliate partner with Kiwi booking platform that gives us a commission for each booking</p>
            <p>This way, Kiwi earns money, we earn money and you use our service for free and take advantage of the best prices</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8a-content"
          id="panel8a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>WHO IS YOUR PARTNER KIWI ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>Kiwi is a big, wellknown and secure booking platform in the travel industry</p>
            <p>We work with them to benefit from its data combining billions of different route combinations</p>
            <p>Pading is a user interface but the booking is made on Kiwi that offers very good guarantee protecting customers from schedule change, delays and cancellations</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9a-content"
          id="panel9a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>WHAT IS PADING'S VISION ?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>Our vision is to put people and th eplanet at the heart of the travel organizing experience and the first thing we do is reducing the distance between loved-ones</p>
            <p>Soon, we will offer the possibility to do a classic travel search and will integrate the train</p>
            <br/>
            <p>We also wait for your feedbacks and recommendations to develop Pading in right direction</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
