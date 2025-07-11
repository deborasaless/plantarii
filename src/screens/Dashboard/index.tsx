import React, { useState, useEffect } from 'react';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
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
} from './styles';
import { tankLevelLow, tankLevelNormal } from '../../mocks/tankLevelCardMock';
import RecoveredWaterCard from './components/recoveredWaterCard';
import TankLevelCard from './components/tankLevelCard';
import WateringCard from './components/wateringCard';
import { wateringMock } from '../../mocks/wateringCardMock';
import { recoveredWaterMock } from '../../mocks/recoveredWaterCardMock';
import LightingCard from './components/lightingCard';
import { lightingMock } from '../../mocks/lightingCardMock';
import CameraCard from './components/cameraCard';
import { cameraMock } from '../../mocks/cameraCardMock';
import AlertsCard from './components/alertsCard';
import { alertsMock } from '../../mocks/alertsCardMock';

const Dashboard: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [isClockHovered, setIsClockHovered] = useState(false);

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(timer);
  }, []);

  // Formata data em pt-BR
  const formattedDate = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  // Formata hora
  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Sol de 05:00 até 17:59; Lua de 18:00 até 04:59
  const hour = now.getHours();
  const isDay = hour >= 5 && hour < 18;

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

      {isClockHovered && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(3px)',
          pointerEvents: 'none',
          zIndex: 900
        }} />
      )}

      <CardsContainer>
        <CardsColumn width="25%">
          <RecoveredWaterCard data={recoveredWaterMock} />
          <TankLevelCard data={tankLevelLow} />
          <WateringCard data={wateringMock} />
          <LightingCard 
            data={lightingMock} 
            onClockHoverStart={() => setIsClockHovered(true)} 
            onClockHoverEnd={() => setIsClockHovered(false)} 
          />
        </CardsColumn>

        <CardsColumn width="50%">
          <CameraCard data={cameraMock} />
        </CardsColumn>

        <CardsColumn width="30%">
          <AlertsCard data={alertsMock} />
          <GenericCard />
        </CardsColumn>
      </CardsContainer>
    </Container>
  );
};

export default Dashboard;
