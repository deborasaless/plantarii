// src/mocks/graphCardMock.ts

export type TimeRange = 'day' | 'week' | 'month';

export interface GraphPoint {
  time: string;      // label do eixo X: "00:00", "01:00" ou "Seg", "Ter", "01/05"…
  consumed: number;  // água consumida (mL)
  reused: number;    // água reutilizada (mL)
  total: number;     // total utilizado (mL) = consumed + reused
}

export interface Summary {
  totalUsed: number;       // soma de total, em mL
  reusedPercent: number;   // % médio reutilizado
  consumedPercent: number; // % médio consumido
  totalChange: number;     // variação em % vs período anterior
  reusedChange: number;    // idem
  consumedChange: number;  // idem
}

export interface GraphCardData {
  day:   { summary: Summary; data: GraphPoint[] };
  week:  { summary: Summary; data: GraphPoint[] };
  month: { summary: Summary; data: GraphPoint[] };
}

// gera N pontos horários com valores aleatórios
function genDay(): GraphPoint[] {
  return Array.from({ length: 24 }, (_, i) => {
    const c = Math.floor(Math.random() * 10 + 5);
    const r = Math.floor(Math.random() * 10 + 5);
    return {
      time: `${String(i).padStart(2,'0')}:00`,
      consumed: c,
      reused: r,
      total: c + r
    };
  });
}

// gera 7 dias: labels "Seg", "Ter", … "Dom"
function genWeek(): GraphPoint[] {
  const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  return days.map((d) => {
    const c = Math.floor(Math.random() * 300 + 100);
    const r = Math.floor(Math.random() * 300 + 100);
    return { time: d, consumed: c, reused: r, total: c + r };
  });
}

// gera 30 dias: labels "01/05", "02/05", …
function genMonth(): GraphPoint[] {
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i+1);
    const label = String(date.getDate()).padStart(2,'0') + '/' +
                  String(date.getMonth()+1).padStart(2,'0');
    const c = Math.floor(Math.random() * 500 + 200);
    const r = Math.floor(Math.random() * 500 + 200);
    return { time: label, consumed: c, reused: r, total: c + r };
  });
}

// calcula resumo a partir dos pontos
function calcSummary(points: GraphPoint[]): Summary {
  const totalSum = points.reduce((s,p)=> s+p.total, 0);
  const reusedSum = points.reduce((s,p)=> s+p.reused, 0);
  const consumedSum = points.reduce((s,p)=> s+p.consumed, 0);
  const reusedPct = +(reusedSum/totalSum*100).toFixed(1);
  const consumedPct = +(consumedSum/totalSum*100).toFixed(1);
  // para mockar variação, gera uns % aleatórios
  const rnd = () => +(Math.random()*10-5).toFixed(2);
  return {
    totalUsed: totalSum,
    reusedPercent: reusedPct,
    consumedPercent: consumedPct,
    totalChange: rnd(),
    reusedChange: rnd(),
    consumedChange: rnd()
  };
}

export const graphMock: GraphCardData = {
  day: {
    data: genDay(),
    summary: calcSummary(genDay())
  },
  week: {
    data: genWeek(),
    summary: calcSummary(genWeek())
  },
  month: {
    data: genMonth(),
    summary: calcSummary(genMonth())
  }
};
