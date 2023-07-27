import styles from './index.module.css'
import React, { useRef } from 'react'
// import NextLink from 'next/link'
import { Wallet } from '@/components/ui'
import { Logo } from '@/components/shared'
import { useRouter } from 'next/router'
import cn from 'classnames'

const Header = ({ activeLink, handleClick }) => {
  const navLinks = [
    { href: 'myCards', label: 'My Cards' },
    { href: 'market', label: 'Market' },
  ]

  return (
    <header className={styles.header}>
      <div className={`${styles.headerWrapper} wrapper`}>
        <div className={styles.headerLeft}>
          <Logo />

          <nav>
            <ul className={styles.list}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    className={cn(
                      styles.link,
                      activeLink === href && styles.active,
                    )}
                    onClick={() => handleClick(href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Wallet />
      </div>
    </header>
  )
}

export default Header
