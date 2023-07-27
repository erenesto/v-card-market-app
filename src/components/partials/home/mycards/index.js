import { Shop } from '@/components/shared'
import { FiltersContext } from '@/context/filters'
import { MyCardsContext } from '@/context/my-cards'
import React, { useContext } from 'react'

const MyCardsSection = () => {
  const { cardTypes, positions, prices } = useContext(MyCardsContext)
  const { myCards, updateFilters } = useContext(FiltersContext)

  const handleUpdateFilters = (filter, type) => {
    updateFilters(filter, type, 'myCards')
  }

  return (
    <Shop
      title="My Cards"
      cards={myCards.filteredCards}
      shopType="my-cards"
      filters={myCards.filters}
      cardTypes={cardTypes}
      positions={positions}
      prices={prices}
      handleUpdateFilters={handleUpdateFilters}
    />
  )
}

export default MyCardsSection
