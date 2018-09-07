import React from 'react';
import { Button, Typography } from 'material-ui';
import DevToolsDetector from '../DevTools/DevToolsDetector';

const DevToolsButton = () => (
  <DevToolsDetector
    render={(err, open, url) => {
      if (err) {
        if (/JSON/.test(err.message)) {
          return (
            <Typography>
              Error connecting to DevTools. Is another application using port
              8000?
            </Typography>
          );
        }
        return (
          <Typography>
            Error. Make sure you are running this in the Editor window
          </Typography>
        );
      }

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
);

export default DevToolsButton;