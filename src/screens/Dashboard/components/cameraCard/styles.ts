import styled from 'styled-components'

export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
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

  transition: color 0.2s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8%;
  width: 100%;
  padding: 2% 0;
`

export const ControlContainer = styled.div<{
  width?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width ?? '100%'};
  height: fit-content;
  gap: 0.8rem;
  border-left: 2px solid #92CF86;
  padding: 0.5% 0 0.5% 2%;
  color: #002E20;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ControlLabel = styled.span`
  color: #002E20;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Countdown = styled.span`
  position: absolute;
  min-width: 40px;
  text-align: right;
  color: #002E20;
  font-size: 0.85rem;
  font-weight: 500;
  padding-left: 4.5%;
`;

export const CameraImage = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    border-radius: 15px;
  }
`
