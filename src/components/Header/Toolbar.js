import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar as MUIToolbar,
  Typography,
  withStyles,
} from 'material-ui';
import DevToolsButton from './DevToolsButton';

const styles = theme => ({
  root: {},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: theme.mixins.toolbar,
});

const Toolbar = ({ classes }) => (
  <AppBar className={classes.appBar} position="absolute">
    <MUIToolbar>
      {/* <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton> */}
      <Typography variant="title" color="inherit" className={classes.flex}>
        Editor
      </Typography>

      <DevToolsButton />
    </MUIToolbar>
  </AppBar>
);

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Toolbar);
