import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import './_Alerts.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function InfoAlert() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity="info">
        This is an info alert — check it out!
      </Alert>
    </div>
  );
}
