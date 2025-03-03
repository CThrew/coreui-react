import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { COffcanvas } from '../../../index'

test('loads and displays COffcanvas component', async () => {
  const { container } = render(<COffcanvas placement="top" />)
  expect(container).toMatchSnapshot()
})

test('COffcanvas customize one', async () => {
  const { container } = render(
    <COffcanvas
      className="bazinga"
      backdrop={false}
      keyboard={false}
      placement="start"
      portal={false}
      visible={false}
    >
      Test
    </COffcanvas>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas')
  expect(container.firstChild).toHaveClass('offcanvas-start')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

test('COffcanvas customize and event on click backdrop', async () => {
  jest.useFakeTimers()
  const onDismiss = jest.fn()
  const { container } = render(
    <COffcanvas
      className="bazinga"
      backdrop={true}
      keyboard={true}
      placement="end"
      portal={false}
      visible={true}
      onDismiss={onDismiss}
    >
      Test
    </COffcanvas>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas')
  expect(container.firstChild).toHaveClass('offcanvas-end')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('show')
  expect(container.firstChild).toHaveTextContent('Test')
  expect(onDismiss).toHaveBeenCalledTimes(0)
  const backdrop = document.querySelector('.modal-backdrop')
  if (backdrop !== null) {
    fireEvent.click(backdrop)
  }
  expect(onDismiss).toHaveBeenCalledTimes(1)
  expect(container.firstChild).not.toHaveClass('show')
})

test('COffcanvas customize and event on keypress', async () => {
  jest.useFakeTimers()
  const onDismiss = jest.fn()
  const { container } = render(
    <COffcanvas
      className="bazinga"
      backdrop={true}
      keyboard={true}
      placement="end"
      portal={false}
      visible={true}
      onDismiss={onDismiss}
    >
      Test
    </COffcanvas>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas')
  expect(container.firstChild).toHaveClass('offcanvas-end')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('show')
  expect(onDismiss).toHaveBeenCalledTimes(0)
  const canvas = document.querySelector('.offcanvas')
  if (canvas === null) {
    expect(true).toBe(false)
  } else {
    fireEvent.keyDown(canvas, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })
  }
  expect(onDismiss).toHaveBeenCalledTimes(1)
  expect(container.firstChild).not.toHaveClass('show')
})
