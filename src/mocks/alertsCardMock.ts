export type AlertType = 'info' | 'warning' | 'danger';

export interface Alert {
  id: string;
  type: AlertType;
  time: string;
  message: string;
}

export interface AlertsCardData {
  alerts: Alert[];
}

// 10 alertas de exemplo
export const alertsMock: AlertsCardData = {
  alerts: [
    { id: 'a1', type: 'info',    time: '08:27', message: 'Última rega: 19/05 às 23:00h' },
    { id: 'a2', type: 'warning', time: '09:27', message: 'Seu tanque irá durar 5 dias de uso' },
    { id: 'a3', type: 'danger',  time: '09:30', message: 'O nível do tanque está baixo' },
    { id: 'a4', type: 'info',    time: '10:42', message: 'Luzes acendidas às 00:00h' },
    { id: 'a5', type: 'warning', time: '11:15', message: 'Recomendado verificar filtros' },
    { id: 'a6', type: 'danger',  time: '12:00', message: 'Aspersor travado' },
    { id: 'a7', type: 'info',    time: '12:30', message: 'Sensor de umidade OK' },
    { id: 'a8', type: 'warning', time: '13:05', message: 'Temperatura alta no reservatório' },
    { id: 'a9', type: 'danger',  time: '14:20', message: 'Falha de comunicação com câmera' },
    { id: 'a10', type: 'info',   time: '15:45', message: 'Manutenção programada para 20/05' },
  ],
};
