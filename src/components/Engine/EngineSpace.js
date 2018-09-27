import { Button, withStyles, Typography } from '@material-ui/core';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import { connect } from 'react-redux';
import { isEngineDead } from '../../engine/redux';

const styles = theme => ({
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
  engine: {
    backgroundColor: theme.palette.grey.A400,
    height: '100%',
    margin: -24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: theme.mixins.toolbar,
});

@connect(
  state => ({ isDead: isEngineDead(state) }),
  {
    onViewportChange: (x, y, height, width) => ({
      type: 'VIEWPORT_CHANGE',
      meta: {
        engineAction: true,
      },
      origin: 'editor',
      payload: {
        x,
        y,
        height,
        width,
      },
    }),
  },
)
class EngineSpace extends Component {
  constructor(props) {
    super(props);

    this.debouncedViewportChange = debounce(this.handleViewportChange, 300);

    this.engineSpace = React.createRef();
  }

  handleViewportChange = () => {
    const { onViewportChange } = this.props;
    const element = this.engineSpace.current;

    onViewportChange(
      element.offsetLeft,
      element.offsetTop,
      element.offsetHeight,
      element.offsetWidth,
    );
  };

  componentDidMount() {
    this.handleViewportChange();
  }

  render() {
    const { classes, isDead, onViewportChange, ...props } = this.props;

    return (
      <main className={classes.content} {...props}>
        <EventListener
          target="window"
          onResize={this.debouncedViewportChange}
        />

        {/* Adds spacing to account for the toolbar */}
        <div className={classes.toolbar} />

        <div className={classes.engine} ref={this.engineSpace}>
          {isDead && (
            <Typography color="error" variant="display1">
              Engine not connected
            </Typography>
          )}
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(EngineSpace);
