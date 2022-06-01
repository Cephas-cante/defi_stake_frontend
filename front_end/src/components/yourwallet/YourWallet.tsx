import React, { useState } from 'react'
import {Token} from "../main/Main"
import {Box, Tab} from '@mui/material';
import {TabList, TabContext, TabPanel} from '@mui/lab'
import WalletBallance from "../walletbalance/WalletBalance"
import StakeForm from "../stakeform/StakeForm"
import "./styles.css";

interface YourWalletProps {
    supportedTokens: Array<Token>
}

const YourWallet = ({ supportedTokens } : YourWalletProps) => {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue))
  } 
  return (
    <Box>
      <h1 className="header">Your Wallet</h1>
      <Box className="box">
        <TabContext value={selectedTokenIndex.toString()}>
          <TabList onChange={handleChange} aria-label="stake form labs">
            {
              supportedTokens.map((token, index) => {
                return (
                  <Tab label={token.name}
                  value={index.toString()}
                  key={index}
                  />
                )
              })
            }
          </TabList>
          {
              supportedTokens.map((token, index) => {
                return (
                  <TabPanel
                  value={index.toString()}
                  key={index}
                  >
                    <div className="tabContent">
                    <WalletBallance token={supportedTokens[selectedTokenIndex]} />
                    <StakeForm token={supportedTokens[selectedTokenIndex]} />
                    </div>
                  </TabPanel>
                )
              })
            }
        </TabContext>
      </Box>
    </Box>
  )
}

export default YourWallet