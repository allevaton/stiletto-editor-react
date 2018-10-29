import { Button, Typography } from '@material-ui/core';
import React from 'react';
import useDevToolsDetector from '../../hooks/useDevToolsDetector';

function DevToolsButton() {
  const { error, open, uri } = useDevToolsDetector();

  if (error) {
    if (/JSON/.test(error.message)) {
      return (
        <Typography color="inherit">
          {
            'Error connecting to DevTools. Is another application using port 8000?'
          }
        </Typography>
      );
    }

    return (
      <Typography color="inherit">
        {'Error. Make sure you are running this in the Editor window.'}
      </Typography>
    );
  }

  if (open) {
    return null;
  }

  return (
    <Button
      color="inherit"
      onClick={() => {
        window.open(uri);
      }}
    >
      {'Open DevTools'}
    </Button>
  );
}

export default DevToolsButton;
