import { JSON_SERVER_URL } from '@/constants/index'

const formatPrice = (price, currency = 'EUR') => {
  return Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  })
    .format(price)
    .replace(/^(\D+)/, '$1 ')
    .replace(/\s+/, ' ')
}

const sliceItemsToCurrentPage = (data, currentPage, itemsPerPage) => {
  if (data.length) {
    const slicedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage,
    )

    return slicedData
  }
}

const fetcher = async (endpoint) =>
  fetch(`${JSON_SERVER_URL}${endpoint}`, {
    referrerPolicy: 'unsafe-url',
  }).then((res) => res.json())

const handleToggle = (checkedItems, val) => {
  const copyChecked = [...checkedItems]

  if (copyChecked.includes(val)) {
    copyChecked.splice(copyChecked.indexOf(val), 1)
  } else {
    copyChecked.push(val)
  }

  return copyChecked
}

const createCategories = (data, type) => {
  const categories = new Set()
  data.forEach((card) => {
    categories.add(card[type])
  })

  const categoriesObject = []
  categories.forEach((cat) => {
    categoriesObject.push({
      name: cat,
      count: data.filter((card) => card[type] === cat).length,
    })
  })

  return categoriesObject
}

const isMoneyEnough = (money, price) => {
  return money >= price
}

export {
  formatPrice,
  sliceItemsToCurrentPage,
  fetcher,
  handleToggle,
  createCategories,
  isMoneyEnough,
}
