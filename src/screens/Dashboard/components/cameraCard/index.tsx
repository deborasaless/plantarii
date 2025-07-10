import React, { useEffect, useState } from 'react';
import { IconInfoCircle, IconCircleFilled, IconBulbFilled, IconDropletsFilled } from '@tabler/icons-react';
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import Toggle from '../../../../components/ToggleButton';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  ContentWrapper,
  ControlsRow,
  CameraImage,
  ControlContainer,
  Countdown,
  ControlLabel
} from './styles';
import type { CameraCardData } from '../../../../mocks/cameraCardMock';
import { wateringMock } from '../../../../mocks/wateringCardMock';

export interface CameraCardProps {
  data: CameraCardData;
}

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const CameraCard: React.FC<CameraCardProps> = ({
  data: { lightsOn, sprinklersOn: initialSprinklersOn, cameraSrc }
}) => {
  const { wateringTime } = wateringMock;
  const [lights, setLights] = useState(lightsOn);
  const [sprinklers, setSprinklers] = useState(initialSprinklersOn);
  const [countdown, setCountdown] = useState<number>(wateringTime);
  
  useEffect(() => {
    if (!sprinklers) {
      setCountdown(wateringTime);
      return;
    }
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          setSprinklers(false);
          return wateringTime;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sprinklers, wateringTime]);

  return (
    <CardContainer>
      <TitleRow>
        <IconCircleFilled size={20} color='#F0464A' />
        <Title>Ao vivo</Title>
        <Tooltip text={DefaultTooltipMessages.cameraCard}>
          <InfoIconWrapper><IconInfoCircle size={18} /></InfoIconWrapper>
        </Tooltip>
      </TitleRow>

      <ContentWrapper>
        <ControlsRow>
          
          {/* Luzes */}
          <ControlContainer width='85%'>
            <IconBulbFilled size={23} color='#EAB308' />
            <ControlLabel> Luzes </ControlLabel>
            <Toggle
              labels={['ON', 'OFF']}
              initialActiveIndex={lights ? 0 : 1}
              onChange={idx => setLights(idx === 0)}
            />
          </ControlContainer>

          {/* Aspersores */}
          <ControlContainer>
            <IconDropletsFilled size={23} color='#3AAFE0' />
            <ControlLabel> Aspersores </ControlLabel>
            {sprinklers && (
              <Countdown>
                {formatTime(countdown)}
              </Countdown>
            )}
            <Toggle
              labels={['ON', 'OFF']}
              activeIndex={sprinklers ? 0 : 1}
              onChange={idx => setSprinklers(idx === 0)}
            />
          </ControlContainer>
        </ControlsRow>

        <CameraImage>
          <img src={cameraSrc} alt="Live camera feed" />
        </CameraImage>
      </ContentWrapper>
    </CardContainer>
  );
};

export default CameraCard;
