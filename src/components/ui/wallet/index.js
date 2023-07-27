import { IconWallet } from '@/components/icons'
import { BudgetContext } from '@/context/budget'
import { formatPrice } from '@/utils/index'
import React, { useContext } from 'react'
import styles from './index.module.css'

const Wallet = () => {
  const { budget } = useContext(BudgetContext)

  return (
    <div className={styles.wallet}>
      <div className={styles.walletIcon}>
        <IconWallet width={32} height={32} />
      </div>
      <div className={styles.walletBalance}>{formatPrice(budget)}</div>
    </div>
  )
}

export default Wallet
