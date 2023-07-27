import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  ADD_TO_MY_CARDS,
  GET_MY_CARDS,
  REMOVE_FROM_MY_CARDS,
  SET_INITIALS,
} from '../constants'
import { createCategories } from '../utils'
import { FiltersContext } from './filters'
import { getMaxPrice, getMinPrice } from './helpers'

export const MyCardsContext = createContext()

const initialState = {
  myCards: [],
  cardTypes: [],
  positions: [],
  prices: {
    minPrice: 0,
    maxPrice: 0,
  },
}

const myCardsReducer = (state, action) => {
  switch (action.type) {
    case GET_MY_CARDS:
      return {
        ...state,
        myCards: [...action.payload],
      }
    case SET_INITIALS:
      const { cardTypes, positions, minPrice, maxPrice } = action.payload

      if (state.myCards.length > 0) {
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
    case ADD_TO_MY_CARDS:
      return {
        ...state,
        myCards: [...state.myCards, action.payload],
      }
    case REMOVE_FROM_MY_CARDS:
      return {
        ...state,
        myCards: state.myCards.filter((card) => card.id !== action.payload),
      }
    default:
      return state
  }
}

export const MyCardsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myCardsReducer, initialState)
  const { updateFilters, updateFilteredCards } = useContext(FiltersContext)

  useEffect(() => {
    if (state.myCards.length > 0) {
      const cardTypes = createCategories(state.myCards, 'cardType')
      const positions = createCategories(state.myCards, 'position')
      const minPrice = getMinPrice(state.myCards)
      const maxPrice = getMaxPrice(state.myCards)

      dispatch({
        type: SET_INITIALS,
        payload: {
          cardTypes,
          positions,
          minPrice,
          maxPrice,
        },
      })

      updateFilteredCards(state.myCards, 'myCards')
      updateFilters({ minPrice, maxPrice }, 'price', 'myCards')
    }
  }, [state.myCards])

  const getMyCards = async (data) => {
    dispatch({ type: GET_MY_CARDS, payload: data })
  }

  const addToMyCards = async (card) => {
    dispatch({ type: ADD_TO_MY_CARDS, payload: card })
  }

  const removeFromMyCards = async (id) => {
    dispatch({ type: REMOVE_FROM_MY_CARDS, payload: id })
  }

  const value = useMemo(() => {
    return {
      myCards: state.myCards,
      cardTypes: state.cardTypes,
      positions: state.positions,
      prices: state.prices,
      getMyCards,
      addToMyCards,
      removeFromMyCards,
    }
  }, [state])

  return (
    <MyCardsContext.Provider value={value}>{children}</MyCardsContext.Provider>
  )
}
