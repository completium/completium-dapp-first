import './App.css';
import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DAppProvider } from './dappstate.js';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { appName } from './settings';
import OwnershipView from './components/OwnershipView';
import ConfirmSnack from './components/ConfirmSnack';

function App() {
  const [viewSnack, setViewSnack] = useState(false);
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
  const openSnack = () => {
    setViewSnack(true);
  }
  const closeSnack = () => {
    setViewSnack(false);
  }
  return (
    <DAppProvider appName={appName}>
      <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header" style={{ backgroundColor: theme.palette.background.default }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                style={{ color: theme.palette.text.primary, fontFamily : 'Alegreya Sans SC, sans-serif' }}
              >
                Completium
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OwnershipView />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ color: theme.palette.text.primary }}>
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
        </header>
      </div>
      <ConfirmSnack open={viewSnack} />
      </ThemeProvider>
    </DAppProvider>
  );
}

export default App;
