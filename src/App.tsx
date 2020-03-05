import React from 'react'
import { Slider } from './Slider'

function App() {
  return (
    <div>
      <Slider initial={10} max={25} onChange={value => console.log(value)} />
    </div>
  )
}

export { App }
