import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';

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
    height: '100%',
    margin: -24,
  },
  toolbar: theme.mixins.toolbar,
});

class EngineSpace extends Component {
  constructor(props) {
    super(props);

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

  getSnapshotBeforeUpdate(prevProps, prevState) {}

  render() {
    const { classes, onViewportChange, ...props } = this.props;

    return (
      <main className={classes.content} {...props}>
        <div className={classes.toolbar} />
        <div className={classes.engine} ref={this.engineSpace}>
          <Button onClick={this.handleViewportChange}>Dispatch Viewport</Button>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onViewportChange: (x, y, width, height) =>
    dispatch({
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
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(EngineSpace));
