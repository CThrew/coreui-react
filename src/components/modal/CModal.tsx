import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { useForkedRef } from '../../utils/hooks'

import { CBackdrop } from '../backdrop/CBackdrop'
import { CModalContent } from './CModalContent'
import { CModalDialog } from './CModalDialog'

export interface CModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Align the modal in the center or top of the screen. [docs]
   *
   * @default 'top'
   */
  alignment?: 'top' | 'center'
  /**
   * Apply a backdrop on body while modal is open. [docs]
   * @default true
   */
  backdrop?: boolean | 'static'
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * @ignore
   */
  duration?: number
  /**
   * Set modal to covers the entire user viewport. [docs]
   */
  fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Closes the modal when escape key is pressed. [docs]
   * @default true
   */
  keyboard?: boolean
  /**
   * Method called before the dissmiss animation has started. [docs]
   */
  onDismiss?: () => void
  /**
   * Generates modal using createPortal. [docs]
   */
  portal?: boolean
  /**
   * Create a scrollable modal that allows scrolling the modal body. [docs]
   */
  scrollable?: boolean
  /**
   * Size the component small, large, or extra large. [docs]
   */
  size?: 'sm' | 'lg' | 'xl'
  /**
   * Remove animation to create modal that simply appear rather than fade in to view. [docs]
   */
  transition?: boolean
  /**
   * Toggle the visibility of modal component. [docs]
   */
  visible?: boolean
}

interface ModalContextProps {
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const CModalContext = createContext({} as ModalContextProps)

export const CModal = forwardRef<HTMLDivElement, CModalProps>(
  (
    {
      children,
      alignment,
      backdrop = true,
      className,
      duration = 150,
      fullscreen,
      keyboard = true,
      onDismiss,
      portal = true,
      scrollable,
      size,
      transition = true,
      visible,
    },
    ref,
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, modalRef)

    const [_visible, setVisible] = useState(visible)
    const [staticBackdrop, setStaticBackdrop] = useState(false)

    useEffect(() => {
      setVisible(visible)
    }, [visible])

    const contextValues = {
      visible: _visible,
      setVisible,
    }

    const handleDismiss = () => {
      if (backdrop === 'static') {
        return setStaticBackdrop(true)
      }
      return onDismiss && onDismiss()
    }

    useLayoutEffect(() => {
      setTimeout(() => setStaticBackdrop(false), duration)
    }, [staticBackdrop])

    const getTransitionClass = (state: string) => {
      return state === 'entering'
        ? 'd-block'
        : state === 'entered'
        ? 'show d-block'
        : state === 'exiting'
        ? 'd-block'
        : ''
    }
    const _className = classNames(
      'modal',
      {
        'modal-static': staticBackdrop,
        fade: transition,
      },
      className,
    )

    // Set focus to modal after open
    useLayoutEffect(() => {
      if (_visible) {
        document.body.classList.add('modal-open')
        setTimeout(
          () => {
            modalRef.current?.focus()
          },
          !transition ? 0 : duration,
        )
      } else {
        document.body.classList.remove('modal-open')
      }
      return () => document.body.classList.remove('modal-open')
    }, [_visible])

    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === 'Escape' && keyboard) {
          return handleDismiss()
        }
      },
      [modalRef, handleDismiss],
    )

    const modal = (ref?: React.Ref<HTMLDivElement>, transitionClass?: string) => {
      return (
        <CModalContext.Provider value={contextValues}>
          <div
            className={classNames(_className, transitionClass)}
            tabIndex={-1}
            role="dialog"
            ref={ref}
          >
            <CModalDialog
              alignment={alignment}
              fullscreen={fullscreen}
              scrollable={scrollable}
              size={size}
              onClick={(event) => event.stopPropagation()}
            >
              <CModalContent>{children}</CModalContent>
            </CModalDialog>
          </div>
        </CModalContext.Provider>
      )
    }

    return (
      <>
        <div onClick={handleDismiss} onKeyDown={handleKeyDown}>
          <CSSTransition
            in={_visible}
            timeout={!transition ? 0 : duration}
            onExit={onDismiss}
            mountOnEnter
            unmountOnExit
          >
            {(state) => {
              const transitionClass = getTransitionClass(state)
              return typeof window !== 'undefined' && portal
                ? createPortal(modal(forkedRef, transitionClass), document.body)
                : modal(forkedRef, transitionClass)
            }}
          </CSSTransition>
        </div>
        {typeof window !== 'undefined' && portal
          ? backdrop && createPortal(<CBackdrop visible={_visible} />, document.body)
          : backdrop && <CBackdrop visible={_visible} />}
      </>
    )
  },
)

CModal.propTypes = {
  alignment: PropTypes.oneOf(['top', 'center']),
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'static'>(['static'])]),
  children: PropTypes.node,
  className: PropTypes.string,
  duration: PropTypes.number,
  fullscreen: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  keyboard: PropTypes.bool,
  onDismiss: PropTypes.func,
  portal: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  transition: PropTypes.bool,
  visible: PropTypes.bool,
}

CModal.displayName = 'CModal'
