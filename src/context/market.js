import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  ADD_TO_MARKET,
  GET_MARKET,
  REMOVE_FROM_MARKET,
  SET_INITIALS,
} from '../constants'
import { createCategories } from '../utils'
import { FiltersContext } from './filters'
import { getMaxPrice, getMinPrice } from './helpers'

export const MarketCardsContext = createContext()

const initialState = {
  marketCards: [],
  cardTypes: [],
  positions: [],
  prices: {
    minPrice: 0,
    maxPrice: 0,
  },
}

const marketCardsReducer = (state, action) => {
  switch (action.type) {
    case GET_MARKET:
      return {
        ...state,
        marketCards: [...action.payload],
      }
    case SET_INITIALS:
      const { cardTypes, positions, minPrice, maxPrice } = action.payload

      if (state.marketCards.length > 0) {
        return {
          ...state,
          cardTypes: [...cardTypes],
          positions: [...positions],
          prices: {
            minPrice,
            maxPrice,
          },
        }
      }
    case ADD_TO_MARKET:
      return {
        ...state,
        marketCards: [...state.marketCards, action.payload],
      }
    case REMOVE_FROM_MARKET:
      return {
        ...state,
        marketCards: state.marketCards.filter(
          (card) => card.id !== action.payload,
        ),
      }
    default:
      return state
  }
}

export const MarketCardsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketCardsReducer, initialState)
  const { updateFilters, updateFilteredCards } = useContext(FiltersContext)

  useEffect(() => {
    if (state.marketCards.length > 0) {
      const cardTypes = createCategories(state.marketCards, 'cardType')
      const positions = createCategories(state.marketCards, 'position')
      const minPrice = getMinPrice(state.marketCards)
      const maxPrice = getMaxPrice(state.marketCards)

      dispatch({
        type: SET_INITIALS,
        payload: {
          cardTypes,
          positions,
          minPrice,
          maxPrice,
        },
      })

      updateFilteredCards(state.marketCards, 'marketCards')
      updateFilters({ minPrice, maxPrice }, 'price', 'marketCards')
    }
  }, [state.marketCards])

  const getMarketCards = async (data) => {
    dispatch({ type: GET_MARKET, payload: data })
  }

  const addToMarket = async (card) => {
    dispatch({ type: ADD_TO_MARKET, payload: card })
  }

  const removeFromMarket = async (id) => {
    dispatch({ type: REMOVE_FROM_MARKET, payload: id })
  }

  const value = useMemo(() => {
    return {
      marketCards: state.marketCards,
      cardTypes: state.cardTypes,
      positions: state.positions,
      prices: state.prices,
      getMarketCards,
      addToMarket,
      removeFromMarket,
    }
  }, [state])

  return (
    <MarketCardsContext.Provider value={value}>
      {children}
    </MarketCardsContext.Provider>
  )
}
