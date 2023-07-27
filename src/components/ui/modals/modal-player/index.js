import React, { useContext } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { IconX } from '@/components/icons'
import { fetcher, formatPrice } from '@/utils/index'
import Button from '@/components/ui/button'
import { ModalContext } from '@/context/modals'
import { BudgetContext } from '@/context/budget'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import { CARD_ENDPOINT } from '@/constants/index'

const ModalPlayer = ({ shopType, handleShopping }) => {
  const { closeModal } = useContext(ModalContext)
  const router = useRouter()
  const { id } = router.query

  const { data: card, error } = useSWR(`${CARD_ENDPOINT}/${id}`, fetcher)

  console.log(card)

  const handleClose = () => {
    closeModal(card.id)
    router.push('/', '/', { shallow: true })
  }

  if (!card)
    return (
      <div
        style={{
          background: 'white',
          padding: '2rem',
        }}
      >
        Loading... wait a bit
      </div>
    )
  if (error) return <div>Error...</div>

  return (
    <div className={styles.player}>
      <IconX
        width={48}
        height={48}
        className={styles.close}
        onClick={handleClose}
      />
      <div className={styles.cardWrapper}>
        <Image
          src={card.photoUrl}
          alt="Card"
          width={198}
          height={286}
          layout="intrinsic"
          className={styles.card}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          {card.name}
          <span>{card.position}</span>
        </div>
        <div className={styles.price}>
          <span>{formatPrice(card.price)}</span>
          <Button
            variant="primary"
            style={{
              paddingInline: '7.4rem',
            }}
            onClick={() => handleShopping(card, true)}
          >
            {shopType === 'market' ? 'Buy' : 'Sell'}
          </Button>
        </div>
        <div className={styles.attrs}>
          <span>Overall</span>
          <div className={styles.attrsWrapper}>
            {Object.keys(card.attributes).map((attr) => (
              <div className={styles.attrBox} key={attr}>
                <div className={styles.attr}>
                  <div className={styles.attr}>{attr}</div>
                  <span>{card.attributes[attr]}</span>
                  <span>/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.other}>
          <span>Team</span>
          {card.team}
        </div>
        <div className={styles.other}>
          <span>Card Type</span>
          {card.cardType}
        </div>
      </div>
    </div>
  )
}

ModalPlayer.propTypes = {
  shopType: PropTypes.string.isRequired,
}

export default ModalPlayer
