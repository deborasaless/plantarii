import React, { useState } from 'react';
import { IconAlertTriangleFilled, IconDropletHalf2Filled, IconInfoCircle } from '@tabler/icons-react';
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
  TextUnit,
  LowAlert,
  TextUses
} from './styles';
import Toggle from '../../../../components/ToggleButton';

export interface TankLevelData {
  absoluteValue: number;
  percentValue: number;
  isLow: boolean;
}

export interface TankLevelCardProps {
  data: TankLevelData;
}

const TankLevelCard: React.FC<TankLevelCardProps> = ({ data }) => {
  const { absoluteValue, percentValue, isLow } = data;
  const [showPercent, setShowPercent] = useState<0 | 1>(0);

  const displayValue = showPercent === 1 ? percentValue : absoluteValue;
  const displayUnit  = showPercent === 1 ? '%'          : 'mL';

  return (
    <CardContainer isLow={isLow}>

        {isLow && (
        <LowAlert>
          <IconAlertTriangleFilled size={14} />
          Nível do tanque baixo
        </LowAlert>
      )}

      <TitleRow>
        <Title>Nível do tanque</Title>
        <Tooltip text={DefaultTooltipMessages.tankLevelCard}>
          <InfoIconWrapper>
            <IconInfoCircle size={18} />
          </InfoIconWrapper>
        </Tooltip>
      </TitleRow>

      <ContentWrapper>
        <ContentRow>
          <IconWrapper>
            <IconDropletHalf2Filled size={25} stroke={2} />
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

        <TextUses>
          5 dias restantes
        </TextUses>



      </ContentWrapper>
    </CardContainer>
  );
};

export default TankLevelCard;
