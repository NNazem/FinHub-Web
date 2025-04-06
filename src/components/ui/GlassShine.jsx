import React from 'react'
import styled from 'styled-components'

const Shine = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
  z-index: 10;
`

export default function GlassShine() {
  return (
    <Shine />
  )
}
