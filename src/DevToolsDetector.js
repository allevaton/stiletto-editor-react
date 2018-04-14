import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @returns {boolean}
 */
function detectDevTools() {
  var devtools = /./;
  devtools.toString = function() {
    this.opened = true;
  };

  console.debug('%cChecking for DevTools...', devtools);

  return devtools.opened;
}

class DevToolsDetector extends Component {
  static propTypes = {
    error: PropTypes.func,
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: () => null,
  };

  constructor(props) {
    super(props);

    const devToolsOpen = detectDevTools();

    this.setupInterval();

    this.state = {
      devToolsOpen,
      devToolsUrl: '',
    };
  }

  async componentWillMount() {
    try {
      const response = await fetch(
        `http://localhost:8000/json/list?t=${new Date().getTime()}`,
        {
          mode: 'cors',
        },
      );
      const responseJson = await response.json();
      const editorItem = responseJson.find(item => /:3000/.test(item.url));
      this.setState({
        devToolsUrl: `http://localhost:8000${editorItem.devtoolsFrontendUrl}`,
        error: null,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setupInterval = () => {
    this.interval = setInterval(() => {
      const opened = detectDevTools();
      this.setState({ devToolsOpen: opened });
    }, 5000);
  };

  render() {
    const { devToolsOpen, devToolsUrl, error } = this.state;

    if (error) {
      return this.props.error(error);
    }

    return this.props.render(devToolsOpen, devToolsUrl);
  }
}

export default DevToolsDetector;
