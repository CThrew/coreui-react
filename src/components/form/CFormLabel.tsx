import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CFormLabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * A string of all className you want applied to the component. [docs]
   */
  className?: string
  /**
   * A string of all className you want to be applied to the component, and override standard className value. [docs]
   */
  customClassName?: string
}

export const CFormLabel = forwardRef<HTMLLabelElement, CFormLabelProps>(
  ({ children, className, customClassName, ...rest }, ref) => {
    const _className = customClassName ? customClassName : classNames('form-label', className)
    return (
      <label className={_className} {...rest} ref={ref}>
        {children}
      </label>
    )
  },
)

CFormLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  customClassName: PropTypes.string,
}

CFormLabel.displayName = 'CFormLabel'
