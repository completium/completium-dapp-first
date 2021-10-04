import React from 'react';
import { useReady, useWallet, useConnect } from '../dappstate';
import { useSettingsContext } from '../settings.js';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';

const WalletButton = (props) => {
  const theme = useTheme();
  const ready = useReady();
  const wallet = useWallet();
  const connect = useConnect();
  const { settings } = useSettingsContext();
  const handleConnect = React.useCallback(async () => {
    try {
      await connect(settings.network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect]);
  return ((ready) ? (
    <div></div>
  ) : (<Button variant="outlined"
    color={theme.palette.text.primary}
    onClick={handleConnect}>
    connect to wallet
  </Button>));
}

export default WalletButton;
