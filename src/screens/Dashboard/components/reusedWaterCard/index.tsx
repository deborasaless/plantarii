import React from 'react'
import { IconDroplet } from '@tabler/icons-react'
import {
  CardContainer,
  Title,
  ContentRow,
  IconWrapper,
  Text,
  Tooltip,
  ContentWrapper
} from './styles'

interface ReusedWaterCardProps {
  /** Quantidade reutilizada, ex: "30 mL" ou "45 %" */
  value: string
  /** Texto exibido no tooltip */
  tooltipText?: string
}

/**
 * Card de água reutilizada.
 * Exibe título, ícone, valor e tooltip de informação.
 */
const ReusedWaterCard: React.FC<ReusedWaterCardProps> = ({
  value,
  tooltipText = 'Reutilização de água em relação ao total utilizado'
}) => {
  return (
    <CardContainer>
      <Title>Água reutilizada</Title>

      <ContentWrapper>
        <ContentRow>
          <IconWrapper>
            <IconDroplet size={20} color="#2a5030" />
          </IconWrapper>

          <Text>{value}</Text>
        </ContentRow>

        <Tooltip>{tooltipText}</Tooltip>
      </ContentWrapper>
    </CardContainer>
  )
}

export default ReusedWaterCard
