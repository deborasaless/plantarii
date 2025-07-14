import React, { useMemo, useState } from 'react';
import { IconInfoCircle, IconX } from '@tabler/icons-react';
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import AlertItem from './AlertItem.index';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  ContentWrapper,
  ScrollArea,
  ClearButton,
  DateHeader
} from './styles';
import type { AlertsCardData, Alert } from '../../../../mocks/alertsCardMock';

const ANIM_DURATION = 400;

const AlertsCard: React.FC<{ data: AlertsCardData }> = ({ data }) => {
  const [alerts, setAlerts] = useState<Alert[]>(data.alerts);
  const [animatingIds, setAnimatingIds] = useState<string[]>([]);
  const [alertsAnimating, setAlertsAnimating] = useState(false);

  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 864e5);

  const recentUnresolved = useMemo(
    () =>
      alerts
        .filter(a => !a.resolved)
        .filter(a => new Date(a.date) >= sevenDaysAgo),
    [alerts]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Alert[]>();
    recentUnresolved.forEach(a => {
      (map.get(a.date) ?? map.set(a.date, []).get(a.date)!).push(a);
    });
    return Array.from(map.entries()).sort((a, b) =>
      b[0].localeCompare(a[0])
    );
  }, [recentUnresolved]);

  const handleClear = () => {
    if (alertsAnimating) return;
    const toRemoveIds = grouped
      .flatMap(([, items]) => items)
      .filter(a => a.type !== 'danger')
      .map(a => a.id);
    if (!toRemoveIds.length) return;
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

  const formatHeader = (iso: string) => {
    const d = new Date(iso);
    const diff = Math.floor((today.getTime() - d.getTime()) / 864e5);
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
        <ClearButton onClick={handleClear}>
          <IconX size={16} /> Limpar
        </ClearButton>
      </TitleRow>

      <ContentWrapper>
        <ScrollArea>
          {grouped.map(([date, items]) => (
            <React.Fragment key={date}>
              <DateHeader>{formatHeader(date)}</DateHeader>
              {items.map(alert => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  removing={animatingIds.includes(alert.id)}
                  onRemove={id => {
                    setAnimatingIds(prev => [...prev, id]);
                    setTimeout(() => {
                      setAlerts(prev => prev.filter(a => a.id !== id));
                      setAnimatingIds(prev =>
                        prev.filter(x => x !== id)
                      );
                    }, ANIM_DURATION);
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        </ScrollArea>
      </ContentWrapper>
    </CardContainer>
  );
};

export default AlertsCard;
