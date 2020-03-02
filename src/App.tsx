import React from 'react'
import styled from 'styled-components'

const ScSlider = styled.div`
  border-radius: 3px;
  background: #dddddd;
  height: 15px;
`

const ScThumb = styled.div`
  width: 10px;
  height: 25px;
  background: #823eb7;
  border-radius: 3px;
  opacity: 0.5;
  cursor: pointer;
  position: relative;
  top: -5px;
`

function Slider() {
  return (
    <>
      <ScSlider>
        <ScThumb />
      </ScSlider>
    </>
  )
}

function App() {
  return <Slider />
}

export { App }
