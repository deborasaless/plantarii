import React from 'react'
import type { PropsWithChildren } from 'react'
import { TooltipContainer, TooltipWrapper } from './styles'

export interface TooltipProps {
  text: string
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({ text, children }) => (
  <TooltipWrapper>
    {children}
    <TooltipContainer>{text}</TooltipContainer>
  </TooltipWrapper>
)

export default Tooltip
