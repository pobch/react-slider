import React from 'react'
import { Slider } from './Slider'

function App() {
  return (
    <div>
      <header>
        <h1>React Slider</h1>
      </header>
      <Slider initial={10} max={25} onChange={value => console.log(value)} />
    </div>
  )
}

export { App }
