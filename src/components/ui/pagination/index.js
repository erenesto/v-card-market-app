import React, { useMemo } from 'react'
import cn from 'classnames'
import styles from './index.module.css'
import { IconArrowLeft, IconArrowRight } from '@/components/icons'

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  handlePageChange,
}) => {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage],
  )

  const pageNumbers = useMemo(() => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={cn(styles.item, i === currentPage ? styles.active : '')}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>,
      )
    }
    return pageNumbers
  }, [currentPage, totalPages])

  if (totalPages <= 1) return null

  return (
    <div>
      <div className={styles.pagination}>
        <span className={styles.arrow}>
          {currentPage > 1 && (
            <IconArrowLeft
              width={32}
              height={32}
              onClick={() => handlePageChange(currentPage - 1)}
            />
          )}
        </span>
        <div className={styles.numbers}>{pageNumbers}</div>
        <span className={styles.arrow}>
          {currentPage < totalPages && (
            <IconArrowRight
              width={32}
              height={32}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          )}
        </span>
      </div>
    </div>
  )
}

export default Pagination
