import React from 'react';
import { useReady, useWallet, useConnect } from '../dappstate';
import { network } from '../settings';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const WalletButton = (props) => {
  const ready = useReady();
  const wallet = useWallet();
  const connect= useConnect();
  const handleConnect = React.useCallback(async () => {
    try {
      await connect(network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect]);
  return ((ready) ? (
        <div></div>
      ) :(wallet ? (
          <Button variant="outlined"
            onClick={handleConnect}>
            connect to wallet
          </Button>
        ):(
          <Link href="https://templewallet.com/" rel="noopener" underline="none" style={{
            position: 'absolute',
            right: '90px'
          }}>
            <Button variant="outlined" disableElevation
              style={{
                backgroundColor: '#ed8936',
                color: 'white',
                fontWeight: 'bold',
                }}>
              install Temple
            </Button>
          </Link>
      )));
}

export default WalletButton;
