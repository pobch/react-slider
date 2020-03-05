import React from 'react'
import { Slider } from './Slider'
import { render } from '@testing-library/react'

test('renders initial and max value', () => {
  const { getByText } = render(<Slider initial={5} max={17} onChange={() => {}} />)
  expect(getByText(/5/i)).toBeInTheDocument()
  expect(getByText(/17/i)).toBeInTheDocument()
})
