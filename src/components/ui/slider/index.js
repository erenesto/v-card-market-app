import React from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Image from 'next/image'

const BannerSlider = ({ items }) => {
  const settings = {
    className: 'banner-slider',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    fadeSpeed: 1000,
    autoplay: true,
  }
  return (
    <Slider {...settings}>
      {items.map((item) => (
        <div key={item.id} className={styles.slide}>
          <div className={styles.content}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.subtitle}>{item.subtitle}</span>
          </div>
          <div className={styles.image}>
            <Image
              src={item.image}
              alt={item.subtitle}
              width={370}
              height={340}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      ))}
    </Slider>
  )
}

BannerSlider.propTypes = {
  items: PropTypes.array.isRequired,
}

export default BannerSlider
