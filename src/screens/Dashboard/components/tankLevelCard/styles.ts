import styled from 'styled-components'

export const CardContainer = styled.div<{ isLow: boolean }>`
  border-radius: 10px;
  position: relative;
  background-color: ${({ isLow }) => (isLow ? '#FFE5E6' : '#FFFFFF')};
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 22%;
`

export const LowAlert = styled.div`
  position: absolute;
  top: -0.4rem;
  gap: 0.2rem;
  right: 0;
  height: 22px;

  background: white;
  color: #F0464A;
  border-radius: 800px;
  border: 1px solid #F0464A;
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

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

  transition: color 0.2s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #008FB2;
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

export const TextUses = styled.span`
  position: relative;
  bottom: 0.4rem;
  font-size: 0.6rem;
  font-weight: 500;
  cursor: default;
  color: #6C6C6C;
`