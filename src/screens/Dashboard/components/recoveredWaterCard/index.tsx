import React, { useState } from 'react';
import { IconRefresh, IconInfoCircle } from '@tabler/icons-react';
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
import Toggle from '../../../../components/ToggleButton';

export interface RecoveredWaterCardProps {
  absoluteValue: number;
  percentValue: number;
}

const RecoveredWaterCard: React.FC<RecoveredWaterCardProps> = ({
  absoluteValue,
  percentValue,
}) => {
  const [showPercent, setShowPercent] = useState<0 | 1>(0);
  const displayValue = showPercent === 1 ? percentValue : absoluteValue;
  const displayUnit = showPercent === 1 ? '%' : 'mL';

  return (
    <CardContainer>
      <TitleRow>
        <Title>Água recuperada</Title>
        <Tooltip text={DefaultTooltipMessages.recoveredWater}>
          <InfoIconWrapper>
            <IconInfoCircle size={18} />
          </InfoIconWrapper>
        </Tooltip>
      </TitleRow>

      <ContentWrapper>
        <ContentRow>
          <IconWrapper>
            <IconRefresh size={25} stroke={2} />
          </IconWrapper>

          <TextContainer>
            <TextValue>{displayValue}</TextValue>
            <TextUnit>{displayUnit}</TextUnit>
          </TextContainer>

          <Toggle
            labels={['mL', '%']}
            initialActiveIndex={0}
            onChange={(idx) => setShowPercent(idx)}
          />
        </ContentRow>
      </ContentWrapper>
    </CardContainer>
  );
};

export default RecoveredWaterCard;
