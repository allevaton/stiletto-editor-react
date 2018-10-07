import { Typography, withStyles } from '@material-ui/core';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResizeObserver from 'react-resize-observer';
import { isEngineDead } from '../../engine/redux';
import engineAction from '../../util/engineAction';

const styles = theme => ({
  content: {
    background: 'transparent',
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  deadEngine: {
    backgroundColor: theme.palette.grey.A400,
    height: '100%',
    margin: -24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  engine: {
    background: 'transparent',
  },
  toolbar: theme.mixins.toolbar,
});

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

  render() {
    const {
      classes, isDead, onViewportChange, ...props
    } = this.props;

    return (
      <main className={classes.content} {...props}>
        <ResizeObserver
          onResize={this.debouncedViewportChange}
          onReflow={this.debouncedViewportChange}
        />

        {/* Adds spacing to account for the toolbar */}
        <div className={classes.toolbar} />

        {isDead ? (
          <div className={classes.deadEngine} ref={this.engineSpace}>
            <Typography color="error" variant="display1">
              {'Engine not connected'}
            </Typography>
          </div>
        ) : (
          <div className={classes.engine} ref={this.engineSpace} />
        )}
      </main>
    );
  }
}

export default connect(
  state => ({ isDead: isEngineDead(state) }),
  {
    onViewportChange: (x, y, height, width) => engineAction({
      type: 'VIEWPORT_CHANGE',
      payload: {
        x,
        y,
        height,
        width,
      },
    }),
  },
)(withStyles(styles)(EngineSpace));
