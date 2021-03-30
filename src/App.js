import './App.css';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DAppProvider /*, useConnect, useAccountPkh, useReady*/ } from './dappstate.js';
import Typography from '@material-ui/core/Typography';
import { appName } from './settings';

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
    <DAppProvider appName={appName}>
      <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="h1" style={{ fontFamily : 'Alegreya Sans SC, sans-serif' }}>Completium</Typography>
          <Typography variant="h5">
            Edit <code>src/App.js</code> and save to reload.
          </Typography>
          <a
            className="App-link"
            href="https://completium.com/dapps"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn everything about DApps
          </a>
        </header>
      </div>
      </ThemeProvider>
    </DAppProvider>
  );
}

export default App;
