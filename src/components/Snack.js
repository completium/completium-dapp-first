import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core';
import { useSnackContext } from '../snackstate';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snack = () => {
    const { snackState } = useSnackContext();
    const theme = useTheme();
    return (
      <Snackbar open={snackState.show} >
        <Alert severity={snackState.severity}>
          {snackState.msg}
        </Alert>
      </Snackbar>)
}

export default Snack