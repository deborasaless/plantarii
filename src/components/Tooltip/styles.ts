import styled from 'styled-components'

export const TooltipContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-1.8rem, 1.4rem);
  background: #EAFBE9;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: #002E20;
  z-index: 1000;
  max-width: 11rem;
  white-space: normal;
  width: 10.5rem;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.15);

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  text-align: justify;
  text-justify: inter-word;
`

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${TooltipContainer} {
    opacity: 1;
    visibility: visible;
  }
`