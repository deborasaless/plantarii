import styled from 'styled-components'

export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 21%;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
`

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #002E20;
  margin: 0;
`

export const InfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #002E20;
  cursor: pointer;
`

export const ContentWrapper = styled.div`
  position: relative;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #004D39;
`

export const TextContainer = styled.span`
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: #004D39;
`

export const TextValue = styled.span`
  font-size: 2.3rem;
  font-weight: 600;
  cursor: default;
`

export const TextUnit = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  cursor: default;
`
