import styled, { css } from 'styled-components';

export const ToggleContainer = styled.div`
  width: 5rem;
  height: 1.6rem;
  background: #A6E09B;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  margin-left: auto;
  
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ToggleOption = styled.div<{ active?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ active }) => (active ? '#FFFFFF' : '#002E20')};
  z-index: 2;
`;

export const ToggleSlider = styled.div<{ activeIndex: number }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(50% - 4px);
  height: calc(100% - 4px);
  background: #004D39;
  border-radius: 100px;
  transition: transform 0.3s ease;
  ${({ activeIndex }) =>
    activeIndex === 0
      ? css`transform: translateX(0);`
      : css`transform: translateX(110%);`}
`;
