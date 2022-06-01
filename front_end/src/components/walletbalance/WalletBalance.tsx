import React from 'react';
import {Token} from "../main/Main";
import {useEthers, useTokenBalance} from "@usedapp/core";
import {formatUnits} from "@ethersproject/units";
import {Button} from "@mui/material";
import BalanceMessage from '../balancemessage/BalanceMessage';

export interface walletBalanceProps {
    token: Token
}

const WalletBalance = ({token}: walletBalanceProps) => {
    const { image, address, name } = token
    const {account} = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formatedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
  return (
    <>
        <BalanceMessage
        label={`Your unstaked ${name} balance`}
        tokenImgSrc={image}
        amount={formatedTokenBalance}
         />
    </>
  )
}

export default WalletBalance