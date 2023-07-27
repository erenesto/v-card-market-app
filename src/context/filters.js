import { createContext, useMemo, useReducer } from 'react'
import { UPDATE_FILTERED_CARDS, UPDATE_FILTERS } from '../constants'
import { shouldFilter } from './helpers'

export const FiltersContext = createContext()

const initialState = {
  myCards: {
    cards: [],
    filteredCards: [],
    filters: {
      cardType: [],
      position: [],
      price: {
        minPrice: 0,
        maxPrice: 0,
      },
    },
  },
  marketCards: {
    cards: [],
    filteredCards: [],
    filters: {
      cardType: [],
      position: [],
      price: {
        minPrice: 0,
        maxPrice: 0,
      },
    },
  },
}

const filtersReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FILTERED_CARDS: {
      const { cards, context } = action.payload
      return {
        ...state,
        [context]: {
          ...state[context],
          cards,
          filteredCards: cards,
        },
      }
    }
    case UPDATE_FILTERS: {
      const { filter, type, context } = action.payload

      const updatedFilters = {
        ...state[context].filters,
        [type]: filter,
      }
      const filteredCards = shouldFilter(updatedFilters, state[context].cards)
      return {
        ...state,
        [context]: {
          ...state[context],
          filteredCards,
          filters: updatedFilters,
        },
      }
    }
    default:
      return state
  }
}

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState)

  const updateFilteredCards = (cards, context) => {
    dispatch({ type: UPDATE_FILTERED_CARDS, payload: { cards, context } })
  }

  const updateFilters = (filter, type, context) => {
    dispatch({ type: UPDATE_FILTERS, payload: { filter, type, context } })
  }

  const value = useMemo(() => {
    return {
      updateFilters,
      updateFilteredCards,
      myCards: state.myCards,
      marketCards: state.marketCards,
    }
  }, [state.myCards, state.marketCards])

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}
