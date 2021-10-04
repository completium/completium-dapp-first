import React from 'react';
import constate from 'constate';
import { KukaiEmbed, Networks } from 'kukai-embed';

export const [
  DAppProvider,
  useWallet,
  useTezos,
  useAccountPkh,
  useReady,
  useConnect,
] = constate(
  useDApp,
  (v) => v.wallet,
  (v) => v.tezos,
  (v) => v.accountPkh,
  (v) => v.ready,
  (v) => v.connect
);

function useDApp({ appName }) {
  const [{ wallet, tezos, accountPkh }, setState] = React.useState(() => ({
    wallet: null,
    tezos: null,
    accountPkh: null,
  }));

  const ready = Boolean(tezos);

  const walletKukai = new KukaiEmbed({
    // net: "https://granadanet.smartpy.io",
    net: Networks.mainnet,
    icon: true
  });

  // React.useEffect(() => {
  //   setState({
  //     wallet: new KukaiEmbed({
  //       net: "https://granadanet.smartpy.io",
  //       icon: true
  //     }),
  //     tezos: null,
  //     accountPkh: null,
  //   });
  // }, [setState, appName]);

  const connect = React.useCallback(
    async (network, opts) => {
      try {
        if (!walletKukai) {
          throw new Error('Kukai Wallet not available');
        }
        await walletKukai.init();
        await walletKukai.login();
        const pkh = walletKukai.user().pkh;
        console.log(`pkh: ${pkh}`);
        setState({
          walletKukai,
          tezos: null,
          accountPkh: pkh,
        });
      } catch (err) {
        alert(`Failed to connect ThanosWallet: ${err.message}`);
      }
    },
    [setState, walletKukai]
  );

  return {
    walletKukai,
    tezos,
    accountPkh,
    ready,
    connect,
  };
}
