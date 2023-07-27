import React from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import Filters from '../filters'
import Cards from '../cards'

const Shop = ({
  title,
  cards,
  shopType,
  filters,
  cardTypes,
  positions,
  prices,
  handleUpdateFilters,
}) => {
  return (
    <div className="wrapper ">
      <div className="container">
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.market}>
          <Filters
            shopType={shopType}
            filters={filters}
            cardTypes={cardTypes}
            positions={positions}
            prices={prices}
            handleUpdateFilters={handleUpdateFilters}
          />
          <Cards cards={cards} shopType={shopType} />
        </div>
      </div>
    </div>
  )
}

Shop.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  shopType: PropTypes.oneOf(['market', 'my-cards']),
  filters: PropTypes.object.isRequired,
  prices: PropTypes.object,
  cardTypes: PropTypes.array,
  positions: PropTypes.array,
  handleUpdateFilters: PropTypes.func.isRequired,
}

export default Shop
