import React, { useState } from 'react'
import { IconRefresh, IconInfoCircle } from '@tabler/icons-react'
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
  ToggleContainer,
  ToggleOption,
  ToggleSlider
} from './styles'
import Tooltip from '../../../../components/Tooltip'
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages'

export interface RecoveredWaterCardProps {
  absoluteValue: number
  percentValue: number
}

const RecoveredWaterCard: React.FC<RecoveredWaterCardProps> = ({
  absoluteValue,
  percentValue,
}) => {
  const [showPercent, setShowPercent] = useState(false)
  const displayValue = showPercent ? percentValue : absoluteValue
  const displayUnit = showPercent ? '%' : 'mL'

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

          <ToggleContainer onClick={() => setShowPercent((p) => !p)}>
            <ToggleSlider active={showPercent} />
            <ToggleOption active={!showPercent}>mL</ToggleOption>
            <ToggleOption active={showPercent}>%</ToggleOption>
          </ToggleContainer>
        </ContentRow>
      </ContentWrapper>
    </CardContainer>
  )
}

export default RecoveredWaterCard
