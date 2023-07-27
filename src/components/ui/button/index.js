import React from 'react'
import cn from 'classnames'
import styles from './index.module.css'
import PropTypes from 'prop-types'

const Button = ({
  children,
  variant,
  isSmall,
  className,
  fullWidth,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        { [styles.small]: isSmall },
        { [styles.fullWidth]: fullWidth },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'transparent']),
  className: PropTypes.string,
}

export default Button
