export type AlertType = 'info' | 'warning' | 'danger';

export interface Alert {
  id: string;
  type: AlertType;
  time: string;
  date: string;
  message: string;
  resolved?: boolean;
}

export interface AlertsCardData {
  alerts: Alert[];
}

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0,10);

// 10 alertas em datas variadas até 8 dias atrás
export const alertsMock: AlertsCardData = {
  alerts: [
    { id: 'a1', type: 'info',    date: iso(today),                   time: '08:27', message: 'Última rega: 19/05 às 23:00h' },
    { id: 'a2', type: 'warning', date: iso(today),                   time: '09:27', message: 'Seu tanque irá durar 5 dias de uso' },
    { id: 'a3', type: 'danger',  date: iso(today),                   time: '09:30', message: 'O nível do tanque está baixo', resolved: false },
    { id: 'a4', type: 'info',    date: iso(new Date(today.getTime() - 1*864e5)), time: '10:42', message: 'Luzes acendidas às 00:00h' },
    { id: 'a5', type: 'warning', date: iso(new Date(today.getTime() - 1*864e5)), time: '11:15', message: 'Recomendado verificar filtros' },
    { id: 'a6', type: 'danger',  date: iso(new Date(today.getTime() - 2*864e5)), time: '12:00', message: 'Aspersor travado' },
    { id: 'a7', type: 'info',    date: iso(new Date(today.getTime() - 5*864e5)), time: '12:30', message: 'Sensor de umidade OK' },
    { id: 'a8', type: 'warning', date: iso(new Date(today.getTime() - 6*864e5)), time: '13:05', message: 'Temperatura alta no reservatório' },
    { id: 'a9', type: 'danger',  date: iso(new Date(today.getTime() - 7*864e5)), time: '14:20', message: 'Falha de comunicação com câmera' },
    { id: 'a10',type: 'info',    date: iso(new Date(today.getTime() - 8*864e5)), time: '15:45', message: 'Manutenção programada para 20/05' },
  ],
};
