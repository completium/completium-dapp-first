import './App.css';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { DAppProvider } from './dappstate';
import { SnackProvider } from './snackstate';
import { appName, alegreya } from './settings';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <DAppProvider appName={ appName }>
      <SnackProvider>
      <ThemeProvider theme={ theme }>
      <CssBaseline />
      <div className="App">
        <Container style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2" style={{ fontFamily : alegreya }}>
                Completium
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Edit <code>src/App.js</code> and save to reload.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link
                href="https://completium.com/dapps"
                target="_blank" rel="noopener noreferrer"
                style={{ color: theme.palette.primary.light }}
              >
                <Typography variant="h6">
                  Learn everything about DApps
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Snack />
      </ThemeProvider>
      </SnackProvider>
    </DAppProvider>
  );
}

export default App;
