import { ModalConfirm } from '@/components/ui/modals'
import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { BUY_CARD, GET_BUDGET, SELL_CARD } from '../constants'
import { isMoneyEnough } from '../utils'
import { MarketCardsContext } from './market'
import { ModalContext } from './modals'
import { MyCardsContext } from './my-cards'

export const BudgetContext = createContext({})

const initialState = {
  budget: 0,
}

const budgetReducer = (state, action) => {
  switch (action.type) {
    case GET_BUDGET:
      return {
        ...state,
        budget: action.payload,
      }
    case BUY_CARD:
      return {
        ...state,
        budget: state.budget - action.payload,
      }
    case SELL_CARD:
      return {
        ...state,
        budget: state.budget + action.payload,
      }
    default:
      return state
  }
}

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  const { addToMarket, removeFromMarket } = useContext(MarketCardsContext)
  const { addToMyCards, removeFromMyCards } = useContext(MyCardsContext)
  const { pushModal, closeModal, clearModals } = useContext(ModalContext)

  const getBudget = (budget) => {
    console.log(budget)
    dispatch({ type: GET_BUDGET, payload: budget })
  }

  const handleBuyCard = (card, modalId, isModal) => {
    dispatch({ type: BUY_CARD, payload: card.price })
    removeFromMarket(card.id)
    addToMyCards(card)
    isModal ? clearModals() : closeModal(modalId)
  }

  const handleSellCard = (card, modalId, isModal) => {
    dispatch({ type: SELL_CARD, payload: card.price })
    removeFromMyCards(card.id)
    addToMarket(card)
    isModal ? clearModals() : closeModal(modalId)
  }

  const buyCard = (card, isModal) => {
    const sorryModalId = `sorry-${card.id}`
    const confirmModalId = `confirm-${card.id}`

    if (!isMoneyEnough(state.budget, card.price)) {
      pushModal(
        <ModalConfirm
          text="You don't have enough money"
          type="Sorry"
          onSubmit={() => closeModal(sorryModalId)}
        />,
        sorryModalId,
      )

      return
    }

    pushModal(
      <ModalConfirm
        text="Would you like to buy the card for"
        type="Buy"
        budget={card.price}
        onSubmit={() => handleBuyCard(card, confirmModalId, isModal)}
        onClose={() => closeModal(confirmModalId)}
      />,
      confirmModalId,
    )
  }

  const sellCard = (card, isModal) => {
    const confirmModalId = `confirm-${card.id}`
    pushModal(
      <ModalConfirm
        text="Would you like to sell the card for"
        type="Sell"
        budget={card.price}
        onSubmit={() => handleSellCard(card, confirmModalId, isModal)}
        onClose={() => closeModal(confirmModalId)}
      />,
      confirmModalId,
    )
  }

  const value = useMemo(() => {
    return {
      budget: state.budget,
      getBudget,
      buyCard,
      sellCard,
    }
  }, [state.budget])

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  )
}
