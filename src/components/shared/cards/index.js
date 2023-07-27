import { Card, Pagination } from '@/components/ui'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import { sliceItemsToCurrentPage } from '@/utils/index'

const Cards = ({ cards, shopType }) => {
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    setCurrentPage(1)
  }, [cards])

  const computedSlicedData = useMemo(() => {
    if (cards.length) {
      const slicedData = sliceItemsToCurrentPage(
        cards,
        currentPage,
        itemsPerPage,
      )
      setTotalItems(cards.length)
      return slicedData
    }
  }, [cards, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className={styles.cards}>
        {computedSlicedData?.map((card) => (
          <Card key={card.id} card={card} shopType={shopType} />
        ))}
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  shopType: PropTypes.oneOf(['market', 'my-cards']),
}

export default Cards
