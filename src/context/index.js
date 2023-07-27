import React from 'react'
import { BudgetProvider } from './budget'
import { FiltersProvider } from './filters'
import { MarketCardsProvider } from './market'
import { ModalProvider } from './modals'
import { MyCardsProvider } from './my-cards'

const CombineProviders = ({ children }) => {
  return (
    <ModalProvider>
      <FiltersProvider>
        <MarketCardsProvider>
          <MyCardsProvider>
            <BudgetProvider>{children}</BudgetProvider>
          </MyCardsProvider>
        </MarketCardsProvider>
      </FiltersProvider>
    </ModalProvider>
  )
}

export default CombineProviders
