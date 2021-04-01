import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useTezos } from '../dappstate';
import { useSnackContext } from '../snackstate';
import { contractAddress } from '../settings';
import { UnitValue } from '@taquito/taquito';


const Bid = () => {
  const Tezos = useTezos();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const handlebid = () => {
    Tezos.wallet.at(contractAddress).then(contract => {
      contract.methods.bid(UnitValue).send({ amount: 10 }).then( op => {
        console.log(`waiting for ${op.opHash} to be confirmed`);
        setInfoSnack(`waiting for ${op.opHash} to be confirmed`)
        op.receipt().then(() => {
          hideSnack();
        }).catch(error => setErrorSnack(error.message));
      }).catch(error => setErrorSnack(error.message))
    });
  }
  return <Button onClick={handlebid}>bid</Button>
}

 export default Bid;