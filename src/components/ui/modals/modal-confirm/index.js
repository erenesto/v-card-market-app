import React from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import Button from '../../button'
import { formatPrice } from '@/utils/index'

const ModalConfirm = ({ onClose, onSubmit, text, type, budget }) => {
  return (
    <div className={styles.modal}>
      <h5 className={styles.text}>{text}</h5>

      {budget && <h3 className={styles.budget}>{formatPrice(budget)}</h3>}

      <div className={styles.actions}>
        <Button variant="primary" fullWidth onClick={onSubmit}>
          {type === 'Sorry' ? 'Back' : type}
        </Button>

        {onClose && (
          <Button variant="transparent" fullWidth onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

ModalConfirm.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['Sell', 'Buy', 'Sorry']),
  budget: PropTypes.number,
  onClose: PropTypes.func,
}

export default ModalConfirm
