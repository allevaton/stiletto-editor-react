import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';

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
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
