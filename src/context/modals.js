import { ModalWrapper } from '@/components/ui/modals'
import { createContext, useContext, useMemo, useState } from 'react'

export const ModalContext = createContext({
  pushModal: (node) => {},
  closeModal: (id) => {},
})

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([])

  const closeModal = (id) => {
    setModals((modals) => modals.filter((modal) => modal.id !== id))
  }

  const pushModal = (node, id) => {
    const modal = (
      <ModalWrapper key={id} id={id}>
        {node}
      </ModalWrapper>
    )

    setModals((modals) => [...modals, { modal, id }])
  }

  const clearModals = () => {
    setModals([])
  }

  const value = useMemo(
    () => ({
      pushModal,
      closeModal,
      clearModals,
    }),
    [],
  )

  return (
    <ModalContext.Provider value={value}>
      {modals.map((modal) => modal.modal)}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
