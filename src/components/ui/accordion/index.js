import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import { IconArrowDown, IconArrowUp } from '@/components/icons'

const Accordion = ({ id, title, children }) => {
  return (
    <div className={styles.accordion}>
      <input type="checkbox" id={id} className={styles.input} />
      <label htmlFor={id} className={styles.label}>
        {title}

        <span>
          <IconArrowDown className={styles.icon} />
        </span>
      </label>
      <div className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Accordion
