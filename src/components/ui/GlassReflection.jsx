import React from 'react'
import styled from 'styled-components'


// Glass reflection effect
const Reflection = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  transform: rotate(-30deg);
  pointer-events: none;
  z-index: 5;
`

export default function GlassReflection() {
  return (
    <Reflection />
  )
}
