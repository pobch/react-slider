import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

const ScSliderHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ScSlider = styled.div`
  border-radius: 3px;
  background: #dddddd;
  height: 15px;
`

const ScThumb = styled.div`
  width: 20px;
  height: 25px;
  background: #823eb7;
  border-radius: 3px;
  opacity: 0.5;
  cursor: pointer;
  position: relative;
  top: -5px;
`

function getPercentage(current: number, end: number) {
  return (current * 100) / end
}

function getValue(percentage: number, max: number) {
  return (percentage * max) / 100
}

function getLeftStyle(percentage: number, length: number) {
  return `${(length * percentage) / 100}px`
}

type Props = {
  initial?: number
  max?: number
  onChange: (value: number) => void
}

function Slider({ initial = 0, max = 100, onChange }: Props) {
  const [, forceRender] = useState({})
  const initLeft = useRef('0')
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<HTMLElement>(null)
  const diff = useRef(0)

  function handleMouseMove(event: MouseEvent) {
    // event.preventDefault()
    if (sliderRef.current !== null && thumbRef.current !== null) {
      let newX = event.clientX - diff.current - sliderRef.current.getBoundingClientRect().left
      let end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth
      let start = 0
      if (newX < start) {
        newX = 0
      } else if (newX > end) {
        newX = end
      }
      const newPercentage = getPercentage(newX, end)
      const newLeft = getLeftStyle(newPercentage, end)
      thumbRef.current.style.left = newLeft
      const newValue = getValue(newPercentage, max)
      if (currentRef.current !== null) {
        currentRef.current.textContent = newValue.toFixed(0)
      }
      onChange(newValue)
    }
  }

  function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseDown(event: React.MouseEvent) {
    // event.preventDefault()
    if (thumbRef.current !== null) {
      diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  useEffect(() => {
    const initialPercentage = getPercentage(initial, max)
    const totalSpace = (sliderRef.current?.offsetWidth ?? 0) - (thumbRef.current?.offsetWidth ?? 0)
    initLeft.current = getLeftStyle(initialPercentage, totalSpace)
    forceRender({})
  }, [initial, max])

  return (
    <>
      <ScSliderHeader>
        <strong ref={currentRef}>{initial}</strong>/{max}
      </ScSliderHeader>
      <ScSlider ref={sliderRef}>
        <ScThumb ref={thumbRef} style={{ left: initLeft.current }} onMouseDown={handleMouseDown} />
      </ScSlider>
    </>
  )
}

function App() {
  return <Slider initial={10} max={25} onChange={value => console.log(value)} />
}

export { App }
