import styled from 'styled-components'

export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 30%;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  justify-content: space-between;
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

export const EditIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #004D39;
  cursor: pointer;
`

export const ContentRow = styled.div`
  //position: relative;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  height: 100px;
  justify-content: space-between;
`

export const ClockSVGContainer = styled.svg.attrs({
  viewBox: '7 6 130 130',
  
})`
  width: 130px;
  height: 130px;
`

export const Slice = styled.path<{
  active: boolean;
  hovered: boolean;
  editMode: boolean;
}>`
    fill: ${({ active }) => (active ? '#003423' : '#DDF1E1')};

    cursor: ${({ editMode }) => (editMode ? 'pointer' : 'default')};

    stroke: ${({ active }) => ( active ? '#003423' : '#DDF1E1')};
    stroke-width: 1px;

    /* só em hover, pinta de vermelho por cima */
    ${({ editMode, hovered }) =>
        editMode && hovered
        ? `
        stroke: #F0464A;
        stroke-width: 1.5px;
    `
        : ''}
    `;

export const Outline = styled.circle`
  fill: none;
  stroke: #549665;
  stroke-width: 2.5;
`;

export const Tick = styled.line<{ major: boolean }>`
  stroke: #549665;
  stroke-width: ${({ major }) => (major ? 1.5 : 1)};
`;

export const HourHand = styled.line`
  stroke: #F0464A;
  stroke-width: 2.5;
  stroke-linecap: round;
`;

export const MinuteHand = styled.line`
  stroke: #64AA78;
  stroke-width: 1.5;
  stroke-linecap: round;
`;

export const CenterDot = styled.circle`
  fill: #014634;
`;

export const TextContainer = styled.span`
  display: flex;
  align-items: center;
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
