import React from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'

const ModalWrapper = ({ children }) => {
  return (
    <div className={styles.modal}>
      <span className={styles.modalOverlay} />
      <div className={styles.modalContent}>{children}</div>
    </div>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalWrapper
