import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TezosToolkit } from '@taquito/taquito';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';


const OwnershipView = (props) => {
  const [{ assetId, owner, forsale }, setData] = useState(() => ({
      assetId : "",
      owner   : "",
      forsale : "",
    }));
  const loadStorage = React.useCallback(async () => {
    const Tezos = new TezosToolkit("https://edonet.smartpy.io");
    var contract  = await Tezos.contract.at("KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd");
    var storage   = await contract.storage();
    setData({
      assetId : storage.assetId,
      owner   : storage.owner,
      forsale : storage._state.toNumber(),
    });
  }, [assetId, owner, forsale]);
  if (assetId === "") loadStorage();
  return (
    <Container maxWidth='xs'>
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item xs={6}>
        <Typography>Asset Id</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{assetId}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Owner</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{owner}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Status</Typography>
      </Grid>
      <Grid item xs={6}><Typography>{forsale>0?"For sale":"Not for sale"}</Typography></Grid>
    </Grid>
    </Container>
  );
}

export default OwnershipView;