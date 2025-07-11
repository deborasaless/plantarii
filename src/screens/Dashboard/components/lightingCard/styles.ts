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

  transition: color 0.2s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

export const EditIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #004D39;
  gap: 8px;
`

export const IconWrapper = styled.div<{
  hoverColor?: string;
  scale?: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #002E20;
  transition: color 0.2s ease, transform 0.3s ease;

  &:hover {
    transform: scale(${({ scale }) => scale ?? 1.2});
    color: ${({ hoverColor }) => hoverColor ?? '#004d38d6'};
  }
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: space-between;
  padding-right: 4%;
`

export const LeftContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 43%;
  height: 100%;
  gap: 3%;
`

export const ClockSVGContainer = styled.svg.attrs({
  viewBox: '0 0 100 100',
  preserveAspectRatio: 'xMidYMid meet'
})`
  position: relative;
  z-index: 1001;
  width: 110px;
  height: 110px;

  transition: transform 0.2s ease;
  transform-origin: bottom left;

  &:hover {
    transform: scale(2.50);
  }
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
  stroke: ${({ major }) => (major ? '#085BEA' : '#549665')};
  stroke-width: ${({ major }) => (major ? 2 : 1.4)};
  stroke-linecap: round;
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

export const RightContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 57%;
  height: 100%;
  gap: 5%;
`

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

export const LegendContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const LegendItem = styled.div<{ dotColor: string }>`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &::before {
    content: '';
    display: flex;
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${({ dotColor }) => dotColor};
    border-radius: 50%;
  }

  font-size: 0.6rem;
  font-weight: 400;
  color: #002E20;
`;

//MODO DE EDIÇÃO ========================================================

export const EditContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  gap: 10px;
  height: 100%;
`

export const CiclesContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #DDF1E1;
  box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  width: 100%;
  padding: 6% 6%;
`

export const CycleControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: fit-content;
`;

export const CounterButton = styled.button`
  width: fit-content;
  height: fit-content;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #004D39;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.10);
  }
`;

export const CycleInput = styled.input`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 600;
  height: 30px;
  width: 45px;
  border: none;
  background-color: transparent;
  color: #004D39;

  /* Chrome, Edge, Safari */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #004D39;
  }
`;

export const CiclesText = styled.span`
  text-align: center;
  font-size: 0.65rem;
  font-weight: 500;
  line-height: 1.4;
  color: #002E20;
`;

export const ButtonsContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 0.4rem;
`;

export const DistributeButton = styled.button<{
    padding?: string;
    fontWeight?: string;
    hoverBorderColor?: string;
    }>`
  cursor: pointer;
  border: 1.5px solid transparent;
  font-weight: 500;
  font-size: 0.8rem;
  color: #004D39;
  width: fit-content;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #DDF1E1;
  padding: 0.3rem 0.4rem;
  border-radius: 6px;

  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: scale(1.10);
    border-color: ${({ hoverBorderColor }) => hoverBorderColor ?? '#004D39'};
    border: 1.5px solid ${({ hoverBorderColor }) => hoverBorderColor ?? '#004D39'};
  }
`;

export const SwitchButton = styled.button`
  width: 100%;
  height: 100%;
  border: 1.5px solid transparent;
  cursor: pointer;
  color: #004D39;
  background-color: #DDF1E1;
  border-radius: 6px;
  padding: 0.02rem 0.02rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);

  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: scale(1.10);
    border-color: #004D39;
    border: 1.5px solid #004D39;
  }
`;

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
  gap: 8%;
`;

export const Button = styled.button<{
    bgColor?: string;
    color?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string;
    hoverBorderColor?: string;
    }>`
  padding: ${({ padding }) => padding ?? '0.3rem 1rem'};
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  font-weight: ${({ fontWeight }) => fontWeight ?? '600'};
  font-size: ${({ fontSize }) => fontSize ?? '0.8rem'};
  background-color: ${({ bgColor }) => bgColor ?? '#DDF1E1'};
  color: ${({ color }) => color ?? '#002E20'};
  width: 100%;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);

  transition: transform 0.3s ease, border-color 0.4s ease;

  &:hover {
    transform: scale(1.10);
    border-color: ${({ hoverBorderColor }) => hoverBorderColor ?? '#F0464A'};
    border: 1.5px solid ${({ hoverBorderColor }) => hoverBorderColor ?? '#F0464A'};
  }
`;
