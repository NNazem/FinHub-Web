const Panel = styled.div`
  background: rgba(28, 28, 30, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  
  // Subtle border
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.5)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  // Top edge highlight
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    opacity: 0.7;
  }
`

import React from 'react'
import styled from 'styled-components'

export default function GlassPanel({children, style}) {
  return (
    <Panel style={style}>{children}</Panel>
  )
}
