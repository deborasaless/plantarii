import styled from 'styled-components'

//ESTILO NORMAL ==================================================================
export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: fit-content;
  gap: 8px;
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
  gap: 8px;
  cursor: pointer;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  height: 100px;
  justify-content: space-between;
  padding-right: 4%;
`

export const ClockSVGContainer = styled.svg.attrs({
  viewBox: '7 -2 130 133',
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
  stroke-width: ${({ major }) => (major ? 2 : 1.4)};
`;

export const HourHand = styled.line`
  stroke: #F0464A;
  stroke-width: 3;
  stroke-linecap: round;
`;

export const MinuteHand = styled.line`
  stroke: #64AA78;
  stroke-width: 2;
  stroke-linecap: round;
`;

export const CenterDot = styled.circle`
  fill: #014634;
`;

export const TextContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #004D39;
`

export const TextTitle = styled.span`
  display: flex;
  flex-direction: row;
  color: #002E20;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: default;
  justify-content: center;
  align-items: center;
`

export const TextValue = styled.span`
  font-size: 1.77rem;
  font-weight: 600;
  color: #004D39;
  cursor: default;
`

//MODO DE EDIÇÃO ========================================================

export const EditContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 20px;
`

export const CiclesContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background-color: #DDF1E1;
  box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  max-width: 84%;
  padding: 5% 6%;
`

export const CiclesNumber = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  height: 30px;
`

export const CiclesText = styled.span`
  text-align: center;
  font-size: 0.65rem;
  font-weight: 500;
  line-height: 1.4;
`

//MODO DE CONFIRMAÇÃO ====================================================

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
`

export const ConfirmMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #002E20;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
`;

export const Button = styled.button<{
    bgColor?: string;
    color?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string;
    }>`
  padding: ${({ padding }) => padding ?? '0.5rem 1rem'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${({ fontWeight }) => fontWeight ?? '500'};
  font-size: ${({ fontSize }) => fontSize ?? '0.7rem'};
  background-color: ${({ bgColor }) => bgColor ?? '#DDF1E1'};
  color: ${({ color }) => color ?? '#002E20'};
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;
