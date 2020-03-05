import React, { useRef, useEffect, useCallback } from 'react'
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

function getPercentage(amount: number, total: number) {
  return (amount * 100) / total
}

function getValue(percentage: number, maxValue: number) {
  return (percentage * maxValue) / 100
}

function getLeftStyleFromPercentage(percentage: number, totalWidth: number) {
  return `${(percentage * totalWidth) / 100}px`
}

type Props = {
  initial?: number
  max?: number
  onChange: (value: number) => void
}

function Slider({ initial = 0, max = 100, onChange }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<HTMLElement>(null)
  const diff = useRef(0)

  const updater = useCallback((newValue: number, newLeftStyle: string) => {
    if (thumbRef.current !== null && currentRef.current !== null) {
      thumbRef.current.style.left = newLeftStyle
      currentRef.current.textContent = newValue.toFixed(0)
    }
  }, [])

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
      const newLeftStyle = getLeftStyleFromPercentage(newPercentage, end)
      const newValue = getValue(newPercentage, max)
      updater(newValue, newLeftStyle)
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
    if (sliderRef.current !== null && thumbRef.current !== null) {
      const totalWidth = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth
      const newPercentage = getPercentage(initial, max)
      const newLeftStyle = getLeftStyleFromPercentage(newPercentage, totalWidth)
      updater(initial, newLeftStyle)
    }
  }, [initial, max, updater])

  return (
    <>
      <ScSliderHeader>
        <strong ref={currentRef}></strong>/{max}
      </ScSliderHeader>
      <ScSlider ref={sliderRef}>
        <ScThumb ref={thumbRef} onMouseDown={handleMouseDown} />
      </ScSlider>
    </>
  )
}

export { Slider }
