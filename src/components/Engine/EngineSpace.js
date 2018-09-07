import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

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

  componentDidMount() {
    const element = this.engineSpace.current;
    console.log('x', element.offsetLeft);
    console.log('y', element.offsetTop);
    console.log('height', element.offsetHeight);
    console.log('width', element.offsetWidth);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {}

  render() {
    const { classes, ...props } = this.props;

    return (
      <main className={classes.content} {...props}>
        <div className={classes.toolbar} />
        <div className={classes.engine} ref={this.engineSpace} />
      </main>
    );
  }
}

export default withStyles(styles)(EngineSpace);
