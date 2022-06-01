import React from 'react'
import { useEthers } from '@usedapp/core'
import {Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import './style.css';

const Header = () => {
    const {account, activateBrowserWallet, deactivate} = useEthers();
    const isConnected = account !== undefined;
  return (
    <div className="buttonContainer">
      <div>
        {
            isConnected ? (
            <Button color='primary' variant="contained" onClick={deactivate}>Disconnect</Button>
            ) 
            :
            (
            <Button color='primary' variant="contained" onClick={() => activateBrowserWallet()}>Connect</Button>
            )
        }
      </div>
    </div>
  )
}

export default Header