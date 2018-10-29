import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const TestElements = () => {
  return (
    <Grid container alignItems="flex-end" spacing={8}>
      <Grid item>
        <TextField label="Start typing something" />
      </Grid>

      <Grid item>
        <Button color="primary">Button</Button>
      </Grid>
    </Grid>
  );
};

export default TestElements;
