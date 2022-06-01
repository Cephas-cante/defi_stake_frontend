import React from 'react'
import './styles.css'

export interface BalanceMsgProps {
    label: string
    amount: number
    tokenImgSrc: string
}

const BalanceMessage = ({label, amount, tokenImgSrc}: BalanceMsgProps) => {
  return (
    <div className='balanceGrid'>
        <div>{label}</div>
        <div className="amount">
            {amount}
        </div>
        <img src={tokenImgSrc} alt="token logo" className="tokenImage" />
    </div>
  )
}

export default BalanceMessage