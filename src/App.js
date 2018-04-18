import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  Drawer,
  Divider,
} from 'material-ui';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

import DevToolsDetector from './DevToolsDetector';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);

const engineAction = action => {
  if (typeof action === 'object' && typeof action.meta === 'object') {
    action.meta._engineAction = true;
  } else {
    action.meta = { _engineAction: true };
  }

  return action;
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
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

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="absolute">
          <Toolbar>
            {/*<IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>*/}
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Editor
            </Typography>

            <DevToolsDetector
              error={err => {
                if (/JSON/.test(err.message)) {
                  return (
                    <div>
                      Error connecting to DevTools. Make sure you do not have
                      another application using port 8000.
                    </div>
                  );
                }

                return (
                  <div>
                    Error. Make sure you are running this in the Editor window{' '}
                    <br />
                    <p>
                      <pre>{err.message}</pre>
                    </p>
                    <p>
                      <pre>{err.response}</pre>
                    </p>
                  </div>
                );
              }}
              render={(open, url) => {
                if (open) return null;

                return (
                  <Button
                    color="inherit"
                    onClick={() => {
                      window.open(url);
                    }}
                  >
                    Open DevTools
                  </Button>
                );
              }}
            />
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>Engine rendering space</Typography>
        </main>
      </div>
    );

    return (
      <div className="App">
        <p>
          <Button
            variant="raised"
            color="primary"
            onClick={this.props.decrement}
          >
            Decrement
          </Button>

          <Button
            variant="raised"
            color="primary"
            onClick={this.props.increment}
          >
            Increment
          </Button>

          <Button
            variant="raised"
            color="primary"
            onClick={this.handleEngineAction}
          >
            Test Engine Action
          </Button>
        </p>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(App));
