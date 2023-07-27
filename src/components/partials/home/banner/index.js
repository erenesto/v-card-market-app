import BannerSlider from '@/components/ui/slider'
import React from 'react'
import styles from './index.module.css'

const items = [
  {
    id: 1,
    title: 'New',
    subtitle: 'BRONZE CARDS',
    image: '/images/bronze-cards.png',
  },
  {
    id: 2,
    title: 'New',
    subtitle: 'SILVER CARDS',
    image: '/images/silver-cards.png',
  },
  {
    id: 3,
    title: 'New',
    subtitle: 'GOLD CARDS',
    image: '/images/gold-cards.png',
  },
]

const BannerSection = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.wrapper}>
        <BannerSlider items={items} />
      </div>
    </div>
  )
}

export default BannerSection
