import React from 'react';
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
} from './styles';
import type { AlertsCardData, Alert } from '../../../../mocks/alertsCardMock';

export interface AlertsCardProps {
  data: AlertsCardData;
}

const iconForType = {
  info: <IconInfoCircleFilled       size={16} style={{ color: '#3B82F6' }} />,
  warning: <IconBellFilled          size={16} style={{ color: '#EAB308' }} />,
  danger: <IconAlertTriangleFilled  size={16} style={{ color: '#F0464A' }} />,
};

const AlertsCard: React.FC<AlertsCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <TitleRow>
        <Title>Alertas</Title>
        <Tooltip text={DefaultTooltipMessages.alertsCard}>
          <InfoIconWrapper>
            <IconInfoCircle size={18} />
          </InfoIconWrapper>
        </Tooltip>
      </TitleRow>

      <ContentWrapper>
        {data.alerts.map((alert: Alert) => (
          <AlertRow key={alert.id} type={alert.type}>
            <AlertIconWrapper>
              {iconForType[alert.type]}
            </AlertIconWrapper>
            <AlertTime>[{alert.time}]</AlertTime>
            <AlertText>{alert.message}</AlertText>
          </AlertRow>
        ))}
      </ContentWrapper>
    </CardContainer>
  );
};

export default AlertsCard;
