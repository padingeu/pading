import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
            <h4>{t("faq-q1")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a1-1")}</p>
              <ul>
                <li><p>{t("faq-a1-2")}</p></li>
                <li><p>{t("faq-a1-3")}</p></li>
                <li><p>{t("faq-a1-4")}</p></li>
                <li><p>{t("faq-a1-5")}</p></li>
              </ul>
              <p>{t("faq-a1-6")}</p>

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
            <h4>{t("faq-q2")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a2-1")}</p>
            <p>{t("faq-a2-2")}</p>
            <p>{t("faq-a2-3")}</p>
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
            <h4>{t("faq-q3")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a3-1")}</p>
            <ul>
              <li><p>{t("faq-a3-2")}</p></li>
              <li><p>{t("faq-a3-3")}</p></li>
              <li><p>{t("faq-a3-4")}</p></li>
              <li><p>{t("faq-a3-5")}</p></li>
            </ul>
            <br/>
            <p>{t("faq-a3-6")}</p>
            <ul>
              <li><p>{t("faq-a3-7")}</p></li>
              <li><p>{t("faq-a3-8")}</p></li>
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
            <h4>{t("faq-q4")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a4-1")}</p>
            <p>{t("faq-a4-2")}</p>
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
            <h4>{t("faq-q5")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a5-1")}</p>
            <p>{t("faq-a5-2")}</p>
            <p>{t("faq-a5-3")}</p>
            <p>{t("faq-a5-4")}</p>
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
            <h4>{t("faq-q6")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a6-1")}</p>
            <p>{t("faq-a6-2")}</p>
            <p>{t("faq-a6-3")}</p>
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
            <h4>{t("faq-q7")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a7-1")}</p>
            <p>{t("faq-a7-2")}</p>
            <p>{t("faq-a7-3")}</p>
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
            <h4>{t("faq-q8")}</h4>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="faq-answers">
            <p>{t("faq-a8-1")}</p>
            <p>{t("faq-a8-2")}</p>
            <br/>
            <p>{t("faq-a8-3")}</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
