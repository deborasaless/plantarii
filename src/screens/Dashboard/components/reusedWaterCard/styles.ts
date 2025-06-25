import styled from 'styled-components'

export const CardContainer = styled.div`
  background:hsl(0, 0.00%, 100.00%);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 8rem;
`

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2a5030;
  margin-bottom: 0.75rem;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Text = styled.span`
  font-size: 0.9rem;
  color: #002e20;
  cursor: default;
`

// Tooltip container, oculto por padrão
export const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translateY(-0.5rem);
  background: #ffffff;
  border: 1px solid #c8e6c9;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #2a5030;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
`

// Quando o usuário passar o mouse sobre a ContentRow, exibe o tooltip
export const ContentWrapper = styled.div`
  position: relative;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`
