import React, { useState, useEffect } from 'react'
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react'
import {
  Container,
  Header,
  Title,
  DateTime,
  DateText,
  TimeRow,
  TitleGroup,
  Logo,
  CardsColumn,
  CardsContainer,
  GenericCard
} from './styles'
import ReusedWaterCard from './components/reusedWaterCard'

const Dashboard: React.FC = () => {
  const [now, setNow] = useState(new Date())

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1_000)
    return () => clearInterval(timer)
  }, [])

  // Formata data em pt-BR
  const formattedDate = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

  // Formata hora
  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  // Sol de 05:00 até 17:59; Lua de 18:00 até 04:59
  const hour = now.getHours()
  const isDay = hour >= 5 && hour < 18

  return (
    <Container>
      <Header>
        <TitleGroup>
          <Logo src="/logo.png" alt="Logo Plantarii" />
          <Title>Plantarii</Title>
        </TitleGroup>

        <DateTime>
          <DateText>{capitalizedDate}</DateText>
          <TimeRow>
            {isDay ? (
              <IconSunFilled size={15} color="#EAB308" />
            ) : (
              <IconMoonFilled size={15} color="#085BEA" />
            )}

            {formattedTime}
          </TimeRow>
        </DateTime>
      </Header>

      <CardsContainer>
        <CardsColumn width="25%">
            <ReusedWaterCard absoluteValue={30} percentValue={20}/>
            <GenericCard/>
            <GenericCard/>
            <GenericCard/>
        </CardsColumn>

        <CardsColumn width="50%">
            <GenericCard/>
        </CardsColumn>

        <CardsColumn width="30%">
            <GenericCard/>
            <GenericCard/>
        </CardsColumn>
      </CardsContainer>
    </Container>
  )
}

export default Dashboard
