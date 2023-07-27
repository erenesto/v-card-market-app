import React, { useContext, useEffect } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import Button from '../button'
import PropTypes from 'prop-types'
import { BudgetContext } from '@/context/budget'
import NextLink from 'next/link'
import { ModalContext } from '@/context/modals'
import { ModalPlayer } from '../modals'
import { formatPrice } from '@/utils/index'
import { useRouter } from 'next/router'

const Card = ({ card, shopType }) => {
  const { sellCard, buyCard } = useContext(BudgetContext)
  const { pushModal, closeModal } = useContext(ModalContext)
  const router = useRouter()

  const handleShopping = (card, isModal) => {
    shopType === 'market' ? buyCard(card, isModal) : sellCard(card, isModal)
  }

  useEffect(() => {
    if (router.query.id !== card.id) {
      closeModal(card.id)
    }
  }, [router.query.id, card.id])

  const handleModal = () => {
    pushModal(
      <ModalPlayer shopType={shopType} handleShopping={handleShopping} />,
      card.id,
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} onClick={handleModal}>
        <NextLink href={`/?id=${card.id}`} as={`/player/${card.id}`} shallow>
          <a>
            <Image
              src={card.photoUrl}
              alt="Card"
              width={198}
              height={286}
              layout="intrinsic"
            />
          </a>
        </NextLink>
      </div>
      <div className={styles.cardContent}>
        <h4>{formatPrice(card.price)}</h4>
        <Button isSmall variant="outline" onClick={() => handleShopping(card)}>
          {shopType === 'market' ? 'Buy' : 'Sell'}
        </Button>
      </div>
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  shopType: PropTypes.oneOf(['market', 'my-cards']),
}

export default Card
