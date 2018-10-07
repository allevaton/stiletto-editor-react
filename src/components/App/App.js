import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import ReduxDevTools from '../DevTools/ReduxDevTools';
import EngineSpace from '../Engine/EngineSpace';
import Header from '../Header/Header';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
};

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />

    <EngineSpace />

    {process.env.NODE_ENV !== 'production' && <ReduxDevTools />}
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
