import React, { useEffect } from 'react'
import {useEthers} from '@usedapp/core';
import helperConfig from "../../helper-config.json";
import brownieConfig from "../../brownie-config.json";
import networkMapping from "../../chain-info/deployments/map.json"
import {constants} from "ethers"
import YourWallet from "../yourwallet/YourWallet"
import dapp from "../../dapp.png"
import eth from "../../eth.png"
import dai from "../../dai.png"
import "./styles.css"

export type Token = {
    image: string,
    address: string, 
    name: string
}

const Main = () => {
    const {chainId} = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    var wethTokenAddress;
    var fauTokenAddress;
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    try{
      if (brownieConfig["networks"][networkName]["weth_token"]){
        console.log(chainId, networkName, brownieConfig["networks"][networkName]["weth_token"])
        wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
        fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero       
      }
    }catch(e){
      console.log("err")
    }
    // console.log(chainId, networkName, brownieConfig["networks"][networkName]["weth_token"])
    const initArray: Array<Token> = [
      {
          image: dapp, 
          address: dappTokenAddress,
          name: "DAPP"
      },
      {
          image: eth, 
          address: wethTokenAddress,
          name: "WETH"
      },
      {
          image: dai, 
          address: fauTokenAddress,
          name: "DAI"
      },
  ]
  const newArray: Array<Token> = [
      {
          image: dapp, 
          address: dappTokenAddress,
          name: "DAPP"
      },
      {
          image: eth, 
          address: wethTokenAddress,
          name: "WETH"
      },
      {
          image: dai, 
          address: fauTokenAddress,
          name: "DAI"
      },
  ]
    const supportedTokens: Array<Token> = (typeof wethTokenAddress == 'undefined') ? initArray : newArray
  return (
    <>
    <h2 className="titleMain">Dapp Token</h2>
    <YourWallet supportedTokens={supportedTokens} />
    </>
  )
}

export default Main