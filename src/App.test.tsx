import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

test('renders main component', () => {
  const { getByText } = render(<App />)
  expect(getByText(/react slider/i)).toBeInTheDocument()
})
