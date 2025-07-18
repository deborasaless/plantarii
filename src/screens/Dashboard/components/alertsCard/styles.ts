import styled, { css, keyframes } from 'styled-components';

export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 45%;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  &:hover { transform: scale(1.2); }
`

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #B6E8BD;
  border-radius: 6px;
  gap: 0.3rem;
  height: 24px;
  padding: 0 0.5rem;
  border: none;
  color: #002E20;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;

  transition: color 0.2s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #004d38d6;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: visible;
  height: 84%;
  border-radius: 10px;
`

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 8px;
  margin: 0 -8px;
  gap: 0.4rem;
  padding-bottom: 5px;
  user-select: none;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #002E20 transparent;

  /* Webkit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #002E20;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    border: none;
  }
`;

export const DateHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0.25rem 0 0.25rem 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #004D39;
`;

const shakeAndScale = keyframes`
  0%   { transform: scale(1.04) translateX(0); }
  25%  { transform: scale(1.04) translateX(-2px); }
  50%  { transform: scale(1.04) translateX(2px); }
  75%  { transform: scale(1.04) translateX(-2px); }
  100% { transform: scale(1.04) translateX(0); }
`;

export const AlertRow = styled.div<{
  type: 'info' | 'warning' | 'danger';
  removing?: boolean;
  shaking?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 315px;
  height: fit-content;
  gap: 1%;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #002E20;
  cursor: pointer;
  position: relative;
  z-index: ${({ shaking }) => (shaking ? 2 : 1)};

  transition: transform 0.4s ease, opacity 0.4s ease;

  ${({ removing }) =>
    removing &&
    css`
      transform: translateX(100%);
      opacity: 0;
  `}

  ${({ shaking }) =>
    shaking &&
    css`
      animation: ${shakeAndScale} 0.3s linear infinite;
  `}

  &:hover {
    ${({ removing, shaking }) =>
      !removing && 
      !shaking &&
      css`
        transform: scale(1.04);
        z-index: 1;
    `}
  }

  &:active {
    ${({ removing, shaking }) =>
      !removing &&
      !shaking &&
      css`
        transform: scale(1.04);
        z-index: 3;
      `}
  }

  ${({ type }) => type === 'info' && css`
    background: #D9E7FF;
    border: 1px solid #85B3FF;
  `}

  ${({ type }) => type === 'warning' && css`
    background: #FFF3CF;
    border: 1px solid #FFDF7B;
  `}

  ${({ type }) => type === 'danger' && css`
    background: #FFE0E1;
    border: 1px solid #FFAAAC;
  `}
`;

export const AlertIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AlertTime = styled.span`
  font-variant-numeric: tabular-nums;
  min-width: 45px;  
`;

export const AlertText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
`;
