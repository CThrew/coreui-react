import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Colors, colorPropType } from '../Types'

import { CCard } from '../card/CCard'
import { CCardBody } from '../card/CCardBody'

export interface CWidgetStatsAProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Action node for your component. [docs]
   */
  action?: ReactNode
  /**
   * Chart node for your component. [docs]
   */
  chart?: string | ReactNode
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors. [docs]
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Title node for your component. [docs]
   */
  title?: string | ReactNode
  /**
   * Value node for your component. [docs]
   */
  value?: string | number | ReactNode
}

export const CWidgetStatsA = forwardRef<HTMLDivElement, CWidgetStatsAProps>(
  ({ action, chart, className, color, title, value, ...rest }, ref) => {
    const _className = classNames(
      { [`bg-${color}`]: color, 'text-high-emphasis-inverse': color },
      className,
    )

    return (
      <CCard className={_className} {...rest} ref={ref}>
        <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
          <div>
            {value && <div className="fs-4 fw-semibold">{value}</div>}
            {title && <div>{title}</div>}
          </div>
          {action}
        </CCardBody>
        {chart}
      </CCard>
    )
  },
)

CWidgetStatsA.propTypes = {
  action: PropTypes.node,
  chart: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  color: colorPropType,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
}

CWidgetStatsA.displayName = 'CWidgetStatsA'
