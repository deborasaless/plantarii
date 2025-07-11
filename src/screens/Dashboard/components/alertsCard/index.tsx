import React, { useMemo, useState } from 'react';
import {
  IconInfoCircle,
  IconInfoCircleFilled,
  IconBellFilled,
  IconAlertTriangleFilled,
} from '@tabler/icons-react';
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  ContentWrapper,
  AlertRow,
  AlertIconWrapper,
  AlertTime,
  AlertText,
  ClearButton,
  DateHeader,
} from './styles';
import type { AlertsCardData, Alert } from '../../../../mocks/alertsCardMock';

export interface AlertsCardProps {
  data: AlertsCardData;
}

const iconForType = {
  info: <IconInfoCircleFilled       size={17} style={{ color: '#3B82F6' }} />,
  warning: <IconBellFilled          size={17} style={{ color: '#EAB308' }} />,
  danger: <IconAlertTriangleFilled  size={17} style={{ color: '#F0464A' }} />,
};

const ANIM_DURATION = 400;

const AlertsCard: React.FC<AlertsCardProps> = ({ data }) => {
  const [alerts, setAlerts] = useState<Alert[]>(data.alerts);
  const [animatingIds, setAnimatingIds] = useState<string[]>([]);
  const [alertsAnimating, setAlertsAnimating] = useState(false);

  // Filtra últimos 7 dias & não resolvidos
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 864e5);

  const recentUnresolved = useMemo(
    () => alerts
      .filter(a => !a.resolved)               // 1) filtra só os não-resolvidos
      .filter(a => new Date(a.date) >= sevenDaysAgo), // 2) e só dos últimos 7 dias
    [alerts]
  );

  // Agrupa por date string
  const grouped = useMemo(() => {
    const map = new Map<string, Alert[]>();
    recentUnresolved.forEach(a => {
      (map.get(a.date) ?? map.set(a.date, []).get(a.date)!).push(a);
    });

    // ordena datas decrescentes
    return Array.from(map.entries())
      .sort((a,b) => b[0].localeCompare(a[0]));
  }, [recentUnresolved]);

  const handleClear = () => {
    if (alertsAnimating) return;

    // 1) percorre o grouped (datas desc) e, dentro de cada data,
    //    processa items na ordem que aparecem na tela
    const toRemoveAlerts = grouped.flatMap(([_, items]) =>
      // filtra só info+warning, mantendo a ordem de exibição
      items.filter(a => a.type !== 'danger')
    );

    if (toRemoveAlerts.length === 0) return;

    const toRemoveIds = toRemoveAlerts.map(a => a.id);

    setAlertsAnimating(true);

    toRemoveIds.forEach((id, idx) => {
      setTimeout(() => {
        setAnimatingIds(prev => [...prev, id]);
      }, idx * ANIM_DURATION);

      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
        if (idx === toRemoveIds.length - 1) {
          setAlertsAnimating(false);
          setAnimatingIds([]);
        }
      }, idx * ANIM_DURATION + ANIM_DURATION);
    });
  };

  // formata cabeçalho de data
  const formatHeader = (isoDate: string) => {
    const d = new Date(isoDate);
    const diff = Math.floor((today.getTime() - d.getTime())/864e5);
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    return d.toLocaleDateString('pt-BR');
  };
  
  return (
    <CardContainer>
      <TitleRow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Title>Alertas</Title>

          <Tooltip text={DefaultTooltipMessages.alertsCard}>
            <InfoIconWrapper>
              <IconInfoCircle size={18} />
            </InfoIconWrapper>
          </Tooltip>
        </div>

        <ClearButton onClick={handleClear} >
          Limpar
        </ClearButton>

      </TitleRow>

      <ContentWrapper>
        {grouped.map(([date, items]) => (
          <React.Fragment key={date}>
            <DateHeader>{formatHeader(date)}</DateHeader>
            
            {items.map(alert => (
              <AlertRow 
                key={alert.id}
                type={alert.type}
                removing={animatingIds.includes(alert.id)}
              >
                <AlertIconWrapper>
                  {iconForType[alert.type]}
                </AlertIconWrapper>
                
                <AlertTime>[{alert.time}]</AlertTime>
                <AlertText>{alert.message}</AlertText>
              </AlertRow>
            ))}
          </React.Fragment>
        ))}
      </ContentWrapper>
    </CardContainer>
  );
};

export default AlertsCard;
