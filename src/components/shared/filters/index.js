import React, { useEffect, useMemo, useState } from 'react'
import { Accordion } from '@/components/ui'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import FilterBoxes from './filter-boxes'
import ReactSlider from 'react-slider'
import { formatPrice } from '@/utils/index'

const Filters = ({
  filters,
  cardTypes,
  positions,
  prices,
  shopType,
  handleUpdateFilters,
}) => {
  const { minPrice, maxPrice } = filters.price
  const [min, setMin] = useState(minPrice)
  const [max, setMax] = useState(maxPrice)

  return (
    <div className={styles.filters}>
      <div className={styles.accordion}>
        <Accordion title="Card Type" id={`${shopType}-card-type`}>
          <FilterBoxes
            items={cardTypes}
            handleFilters={(filters) =>
              handleUpdateFilters(filters, 'cardType')
            }
          />
        </Accordion>
      </div>

      <div className={styles.accordion}>
        <Accordion title="Position" id={`${shopType}-position`}>
          <FilterBoxes
            items={positions}
            handleFilters={(filters) =>
              handleUpdateFilters(filters, 'position')
            }
          />
        </Accordion>
      </div>

      <div className={styles.accordion}>
        <Accordion title="Price" id={`${shopType}-price`}>
          <div className={styles.price}>
            <span className={styles.min}>
              {formatPrice(min > 0 ? min : minPrice)}
            </span>
            <span className={styles.max}>
              {formatPrice(max > 0 ? max : maxPrice)}
            </span>
          </div>
          {minPrice && maxPrice && (
            <ReactSlider
              key={minPrice + maxPrice}
              className="price-slider"
              thumbClassName="thumb"
              trackClassName="track"
              defaultValue={[minPrice, maxPrice]}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              min={prices.minPrice}
              max={prices.maxPrice}
              onChange={(value) => {
                setMin(value[0])
                setMax(value[1])
              }}
              onAfterChange={(value) => {
                handleUpdateFilters(
                  { minPrice: value[0], maxPrice: value[1] },
                  'price',
                )
              }}
            />
          )}
        </Accordion>
      </div>
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  cardTypes: PropTypes.array,
  positions: PropTypes.array,
  prices: PropTypes.object,
  shopType: PropTypes.oneOf(['market', 'my-cards']),
  handleUpdateFilters: PropTypes.func.isRequired,
}

export default Filters
