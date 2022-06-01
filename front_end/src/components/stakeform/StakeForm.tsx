import React, {useState, useEffect} from "react"; 
import {Token} from "../main/Main";
import {useEthers, useTokenBalance, useNotifications} from "@usedapp/core";
import {formatUnits} from "@ethersproject/units";
import {Button, Input, CircularProgress, Snackbar} from "@mui/material";
import UseStakeTokens from "../../hooks/UseStateTokens";
import {utils} from "ethers";
import {Alert} from '@mui/lab'

export interface stakeFormProps {
  token: Token
}

export const StakeForm = ({token}: stakeFormProps) => {
    const [amount, setAmount] = useState<number | string | Array<number | string>>(0);
    const { address: tokenAddress, name } = token
    const {account} = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formatedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const {notifications} = useNotifications()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value == "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }
    const {approveAndStake, state: approveAndStakeErc20State} = UseStakeTokens(tokenAddress);
    const handleStateSubmit = () => {
      const amountAsWei = utils.parseEther(amount.toString())
      return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeErc20State.status === "Mining"
    const [showERC20ApprovalSuccess, setShowERC20ApprovalSuccess] = useState(false);
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false);

    const handleCloseSnack = () => {
      setShowERC20ApprovalSuccess(false);
      setShowStakeTokenSuccess(false);
    }

    useEffect(() => {
      if (notifications.filter(
        (notification) => 
        notification.type === "transactionSucceed" 
        && notification.transactionName === "Approve ERC20 Tranfer").length > 0) {
          setShowERC20ApprovalSuccess(true);
          setShowStakeTokenSuccess(false);
      }
      if (notifications.filter(
        (notification) => 
        notification.type === "transactionSucceed" 
        && notification.transactionName === "Stake Tokens").length > 0) {
          setShowERC20ApprovalSuccess(false);
          setShowStakeTokenSuccess(true);
      }
    },[notifications, showERC20ApprovalSuccess, showStakeTokenSuccess])
  return (
    <>
      <div>
      <Input onChange={handleChange} />
      <Button onClick={handleStateSubmit} disabled={isMining} color="primary" size="large">
        {isMining ? <CircularProgress size={26} /> : "Stake!" }
      </Button>
      </div>
      <Snackbar open={showERC20ApprovalSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          ERC20 Token Approved! Awaiting second transaction
        </Alert>
      </Snackbar>
      <Snackbar open={showStakeTokenSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens Staked!
        </Alert>
      </Snackbar>
    </>
  )
}


export default StakeForm