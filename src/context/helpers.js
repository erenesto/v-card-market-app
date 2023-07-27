export const shouldFilter = (updatedFilters, cards) => {
  const allFilters = {
    cardType:
      updatedFilters.cardType.length > 0 ? updatedFilters.cardType : null,
    position:
      updatedFilters.position.length > 0 ? updatedFilters.position : null,
    minPrice:
      updatedFilters.price.minPrice > 0 ? updatedFilters.price.minPrice : null,
    maxPrice:
      updatedFilters.price.maxPrice > 0 ? updatedFilters.price.maxPrice : null,
  }

  const filteredCards = cards.filter((card) => {
    for (const filter in allFilters) {
      if (!allFilters[filter]) continue
      if (filter === 'minPrice' || filter === 'maxPrice') {
        if (
          card.price < allFilters.minPrice ||
          card.price > allFilters.maxPrice
        )
          return false
      } else {
        if (Array.isArray(allFilters[filter])) {
          if (!allFilters[filter].includes(card[filter])) return false
        } else {
          if (card[filter] !== allFilters[filter]) return false
        }
      }
    }
    return true
  })
  return filteredCards
}

export const getMinPrice = (cards) => {
  return Math.min(...cards.map((card) => card.price))
}

export const getMaxPrice = (cards) => {
  return Math.max(...cards.map((card) => card.price))
}
