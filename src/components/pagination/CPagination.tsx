import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CPaginationProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Set the alignment of pagination components. [docs]
   */
  align?: 'start' | 'center' | 'end'
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * Size the component small or large. [docs]
   */
  size?: 'sm' | 'lg'
}

export const CPagination = forwardRef<HTMLUListElement, CPaginationProps>(
  ({ children, align, className, size, ...rest }, ref) => {
    const _className = classNames(
      'pagination',
      {
        [`justify-content-${align}`]: align,
        [`pagination-${size}`]: size,
      },
      className,
    )
    return (
      <nav ref={ref} {...rest}>
        <ul className={_className}>{children}</ul>
      </nav>
    )
  },
)

CPagination.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
}

CPagination.displayName = 'CPagination'
