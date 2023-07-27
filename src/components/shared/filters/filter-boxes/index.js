import { FilterCheckbox } from '@/components/ui'
import { handleToggle } from '@/utils/index'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FilterBoxes = ({ items, handleFilters }) => {
  const [checkedItems, setCheckedItems] = useState([])

  const onToggle = (name) => {
    const newCheckedItems = handleToggle(checkedItems, name)
    setCheckedItems(newCheckedItems)
    handleFilters(newCheckedItems)
  }
  return (
    <>
      {items?.map((item) => {
        const id = uuidv4()
        return (
          <FilterCheckbox
            key={item.name}
            id={id}
            filter={item}
            onChange={() => onToggle(item.name)}
            checked={checkedItems.includes(item.name)}
          />
        )
      })}
    </>
  )
}

export default FilterBoxes
