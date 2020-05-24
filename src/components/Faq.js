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
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>Who are you hidden behind Pading?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              We are Mamadou, Louis and Cristobal from Manchester, Lille and Córdoba. Thanks to
              Erasmus, we all had the great chance to travel abroad and know international people
              that are close friends now.
              <br />
              <br />
              As it can be complex to meet somewhere with long-distance friends and family, we
              decided to launch Pading{' '}
              <b>to help us and to help you finding the best destinations where to meet</b>.
            </p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={`${classes.heading} faq-title`}>
            <h4>What are the strenghts of Pading?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              <b>
                Pading is the only travel comparator that allow you to find common destinations
                according to multi departure cities and some dates.
              </b>
              <br />
              <br />
              Andy and Juli are leaving from München and Frankfürt.
              <br />
              Filippo is leaving from Firenze.
              <br />
              Eilidh is leaving from Glasgow.
              <br />
              Violaine, Ludi, Louis and Dimitri are leaving from Paris.
              <br />
              <br />
              Our algorithm search for all the existing travel combinations to meet in a same place.{' '}
              <b>The cheapest destinations for the all team are highlighted</b>.
            </p>
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
            <h4>How do you find for us the cheapest prices?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              We work with our partner Kiwi to enjoy the{' '}
              <b>
                520 billion different route combinations of low-cost and full-service flights,
                trains and buses
              </b>
              . Our algorithm integrates all this data and find for you the cheapest common
              destinations.
              <br />
              <br />
              You just have to select the next place you would like to meet with your friends or
              family and book your tickets.
            </p>
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
            <h4>Why do we save a lot of time organizing our next meeting with Pading?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              Without Pading, organizing the next meeting with your long-distance friends or family
              can be rather complicated:
              <br />
              - Proposing a destination
              <br />
              - Looking at all the travel possibilities and all the prices for each people
              <br />
              - Proposing an other destination if this one does not match everyone's criteria
              <br />
              - Do the same X times until it is good
              <br />
              <br />
              <b>
                With Pading, it looks like this:
                <br />
                - Fill the dates and enter all the departure cities you and your friends/family come
                from
                <br />
                - Select your common destination among the cheapest ones
                <br />- Travel and meet
              </b>
            </p>
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
            <h4>What means of transport can be booked?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              We look at all the travel possibilities, in the air and on the ground to connect any
              point in the world to any point.
              <b>We combine airlines, trains and buses</b> to make you arrive at your destination
              and meet each other.
            </p>
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
            <h4>How do you integrate Ecology into Pading?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              This is honestly our biggest dilemma. How can we facilitate travel and respect our
              planet as well as possible?
              <br />
              <br />
              <b>We want to empower each traveler to offset his co2 emissions</b>. For this reason
              we calculate the climate impact of each destination.
              <br />
              From our side, <b>we plant trees</b> to get a neutral Co2 Website{' '}
              <b>and develop as well as possible train journey</b>.
            </p>
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
            <h4>How do you make money?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              Pading is a user interface. The booking is made on Kiwi secure Website that offers
              very good guarantee protecting customers from schedule change, delays and
              cancellations.
              <br />
              <br />
              <b>
                We work as an affiliate with Kiwi booking platform that gives us a 3% commission of
                each booking amount.
              </b>
              <br />
              <br />
              - Kiwi earns money from carriers
              <br />
              - We earn money from Kiwi
              <br />
              - You find the cheapest destination without any fee.
              <br />
            </p>
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
            <h4>What is Kiwi, the Website where I will be redirected to book your tickets?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              <b>Kiwi is a big, wellknown and secure booking platform in the travel industry</b>. We
              work with them to benefit from its data combining 520 billion different route
              combinations with flights, trains and buses.
              <br />
              <br />
              Pading is a user interface. We integrate data from Kiwi to search for common
              destinations according to dates and multiple departure cities.
              <b>
                The booking is made on Kiwi secure Website that offers a 24/7 customer support and
                great guarantee
              </b>{' '}
              in case of schedule change, delays and cancellations.
            </p>
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
            <h4>What is your vision with Pading?</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>
              <b>
                We want to make easier long-distance friendships and family meetings.
                <br />
                We wait for your feedbacks and recommendations to develop Pading in the right
                direction.
              </b>
              <br />
              <br />
              This is what we imagine for later:
              <br />
              - To allow an even more detailed and powerful research (flexible dates, vehicle type,
              etc.)
              <br />
              - To propose you the best value for money housing once you know where and when you
              will meet.
              <br />- To explore the best dates for a destination already chosen so that your trip
              will be as cheap as possile.
            </p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
