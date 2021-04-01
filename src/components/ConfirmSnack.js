import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ConfirmSnack = (props) => {
    const theme = useTheme();
    return (
      <Snackbar open={props.open} >
        <Alert severity="info" style={{
            backgroundColor: theme.palette.info.main
        }}>
          Waiting for operation confirmation ...
        </Alert>
      </Snackbar>)
}

export default ConfirmSnack