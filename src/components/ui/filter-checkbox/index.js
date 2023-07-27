import React from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'

const FilterCheckbox = ({ id, filter, ...props }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={filter.name}
        className={styles.input}
        {...props}
      />
      <label htmlFor={id} className={styles.label}>
        {filter.name} ({filter.count})
      </label>
    </div>
  )
}

FilterCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired,
}

export default FilterCheckbox
