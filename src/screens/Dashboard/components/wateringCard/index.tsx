import React from 'react';
import { IconClock, IconInfoCircle } from '@tabler/icons-react';
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  ContentWrapper,
  ContentRow,
  IconWrapper,
  TextContainer,
  TextValue,
  TextUnit
} from './styles';
import type { WateringCardData } from '../../../../mocks/wateringCardMock';

export interface WateringCardProps {
  data: WateringCardData;
}

const WateringCard: React.FC<WateringCardProps> = ({
  data: { absoluteValue },
}) => {
  const displayValue = absoluteValue;
  const displayUnit  = 'min';

  return (
    <CardContainer>
      <TitleRow>
        <Title>Próxima rega</Title>
        <Tooltip text={DefaultTooltipMessages.wateringCard}>
          <InfoIconWrapper>
            <IconInfoCircle size={18} />
          </InfoIconWrapper>
        </Tooltip>
      </TitleRow>

      <ContentWrapper>
        <ContentRow>
          <IconWrapper>
            <IconClock size={25} stroke={2} />
          </IconWrapper>

          <TextContainer>
            <TextValue>{displayValue}</TextValue>
            <TextUnit>{displayUnit}</TextUnit>
          </TextContainer>
        </ContentRow>
      </ContentWrapper>
    </CardContainer>
  );
};

export default WateringCard;
