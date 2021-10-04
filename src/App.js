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
import { appName, alegreya, courier } from './settings';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';
import { SettingsPanel } from './components/Settings';

import { TezosToolkit } from '@taquito/taquito';
import { SettingsProvider, useSettingsContext } from './settings.js';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import { useTezos, useAccountPkh } from './dappstate';
import { useSnackContext } from './snackstate';
import { UnitValue } from '@taquito/taquito';

const Cell = (props) => {
  return (<Grid item xs={6}><Typography align="left" variant="subtitle2"
    style={ props.data ? { fontFamily: courier } : { } }> { props.val }
  </Typography></Grid>)
}

const OwnershipData = (props) => {
  const { settings } = useSettingsContext();
  const [{ assetid, owner, forsale }, setData] = useState(() => ({
      assetid : "",
      owner   : "",
      forsale : "",
    }));
  const loadStorage = React.useCallback(async () => {
    const tezos     = new TezosToolkit(settings.endpoint);
    const contract  = await tezos.contract.at(settings.contract);
    const storage   = await contract.storage();
    console.log(storage);
    setData({
      assetid : storage.assetid,
      owner   : storage.owner,
      forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",
    });
  }, [assetid, owner, forsale]);
  if (assetid === "") loadStorage();
  return (
    <Container maxWidth='xs'>
    <Grid container direction="row" alignItems="center" spacing={1}>
      <Cell val="Asset Id"/><Cell val={ assetid.substring(0, 20) + "..." } data/>
      <Cell val="Owner"   /><Cell val={ owner.substring(0, 20) + "..." } data/>
      <Cell val="Status"  /><Cell val={ forsale }/>
    </Grid>
    </Container>
  );
}

const BidButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh();
  const { settings } = useSettingsContext();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const bid = async () => {
    try {
      const contract  = await tezos.wallet.at(contract);
      const operation = await contract.methods.bid(UnitValue).send({ amount: 10 });
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
      setTimeout(hideSnack, 4000);
    }
  }
  return (
    <Button onClick={ bid } variant="outlined" disabled={ account === null }>
      post bid
    </Button>);
}

const ClaimButton = () => {
  const { settings } = useSettingsContext();
  const tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const claim = async () => {
    try {
      const contract  = await tezos.wallet.at(settings.contract);
      const operation = await contract.methods.claim(UnitValue).send();
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
      setTimeout(hideSnack, 4000);
    }
  }
  return (
    <Button onClick={ claim } variant="outlined" disabled={ account === null }>
      Claim
    </Button>);
}

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
      <SettingsProvider>
      <SnackProvider>
      <ThemeProvider theme={ theme }>
      <CssBaseline />
      <div className="App">
        <Container style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <OwnershipData />
            </Grid>
            <Grid item xs={12}>
                <BidButton />
            </Grid>
            <Grid item xs={12}>
                <ClaimButton />
            </Grid>
            <Grid item xs={12}>
                <WalletButton />
            </Grid>
          </Grid>
        </Container>
      </div>
      <SettingsPanel/>
      <Snack />
      </ThemeProvider>
      </SnackProvider>
      </SettingsProvider>
    </DAppProvider>
  );
}

export default App;