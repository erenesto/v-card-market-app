import { Shop } from '@/components/shared'
import { FiltersContext } from '@/context/filters'
import { MarketCardsContext } from '@/context/market'
import React, { useContext } from 'react'

const MarketSection = () => {
  const { cardTypes, positions, prices } = useContext(MarketCardsContext)
  const { marketCards, updateFilters } = useContext(FiltersContext)

  const handleUpdateFilters = (filter, type) => {
    updateFilters(filter, type, 'marketCards')
  }

  return (
    <Shop
      title="Market"
      cards={marketCards.filteredCards}
      shopType="market"
      filters={marketCards.filters}
      cardTypes={cardTypes}
      positions={positions}
      prices={prices}
      handleUpdateFilters={handleUpdateFilters}
    />
  )
}

export default MarketSection
