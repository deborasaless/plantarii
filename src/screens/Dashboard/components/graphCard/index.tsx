import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { IconInfoCircle, IconTriangleFilled, IconTriangleInvertedFilled, IconChevronDown, IconCheck } from '@tabler/icons-react';
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  SummaryRow,
  SummaryItem,
  ContentWrapper,
  GraphContainer,
  Metrics,
  ChangeGroup,
  ChangeValue,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectItem,
  ItemText,
  ItemIndicator
} from './styles';
import { graphMock, type TimeRange, type GraphPoint } from '../../../../mocks/graphCardMock';
import * as Select from '@radix-ui/react-select';

const optionsList: { value: TimeRange; label: string }[] = [
  { value: 'day',   label: 'Dia' },
  { value: 'week',  label: 'Semana' },
  { value: 'month', label: 'Mês' }
];

function formatVolume(value: number): { value: string, unit: string } {
  if (value >= 1000) {
    return { value: (value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }), unit: 'L' };
  }
  return { value: value.toLocaleString(), unit: 'mL' };
}

export const GraphCard: React.FC = () => {
  const [range, setRange] = useState<TimeRange>('day');
  const { data, summary } = useMemo(() => graphMock[range], [range]);

  const labels = useMemo(
    () => data.map((pt: GraphPoint, i: number) => {
      if (range === 'day') {
        // 1h, 2h … 24h
        return `${i + 1}h`;
      }
      if (range === 'week') {
        // só as três primeiras letras do nome do dia
        return pt.time.slice(0, 3);
      }
      // month — “01”, “02” …
      return pt.time.split('/')[0];
    }),
    [data, range]
  );

  const series = useMemo(() => [
    { name: 'Total',       values: data.map(pt => pt.total),      color: '#B6E8BD' },
    { name: 'Recuperada', values: data.map(pt => pt.reused),     color: '#228C5C' },
    { name: 'Consumida',   values: data.map(pt => pt.consumed),   color: '#004D39' },
    
  ], [data]);

  const option = useMemo(() => {
    const barWidthPercent = `${Math.max(
      80,
      Math.min(60, (100 / labels.length) * 0.6)
    )}%`;

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(147, 190, 144, 0.2)',
          }
        },
        backgroundColor: '#EAFBE9',  // fundo quase preto
        borderColor: '#EAFBE9',                     // verde escuro
        borderWidth: 0,
        borderRadius: 4,
        padding: 0,
        textStyle: {
          color: '#002E20',                         // texto branco
          fontSize: 12,
          fontWeight: 500,
        },
        extraCssText: 'box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.15);',

        formatter: (params: any[]) => {
          const first = params[0];
          let title: string;

          if (range === 'day') {
            const label = String(first.axisValue);
            const hourNum = parseInt(label.replace(/h$/, ''), 10);
            const prev = hourNum - 1;
            title = `Horário: ${prev}h às ${hourNum}h`;
          } 
          
          else {
            title = `Dia: ${first.axisValue}`;
          } 
          
          let html = 
          `<div style="
            font-weight: bold;
            font-size: 13px;
            background-color: #EAFBE9;
            padding: 10px 10px 5px 10px;
            border-radius: 4px 4px 0 0;
            
            margin-bottom: 6px;
            color: #002E20;
            ">${title}</div>`;

          params.forEach(p => {
            const activeColor = p.seriesName === 'Recuperada' && p.data === /*se desabilitado*/ null
              ? 'rgba(255,255,255,0.9)' 
              : '#002E20';
            html += `
              <div style="display:flex; align-items:center; padding: 0px 10px 10px 10px; ">
                <span style="display:inline-block; width:10px; height:10px; background-color:${p.color}; border-radius:50%; margin-right:5px;"></span>
                <span style="color:${activeColor};">${p.seriesName}: ${p.data} mL</span>
              </div>
            `;
          });
          return html;
        }
      },

      grid: {
        left: 13,
        right: 0,
        top: 22,
        bottom: 25,
        containLabel: true,
      },

      legend: {
        data: ['Total', 'Recuperada', 'Consumida'],
        bottom: -5,
        right: -5,
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { fontSize: 10.5, color: '#004D39' },
      },

      xAxis: {
        type: 'category',
        data: labels,
        axisTick: { alignWithLabel: true, show: true, lineStyle: { color: '#68BB9A' } },
        axisLine: { lineStyle: { color: '#68BB9A' }, show: true },
        axisLabel: { color: '#004D39', fontSize: 10.5 }
      },

      yAxis: {
        type: 'value',
        name: 'Volume (mL)',
        nameLocation: 'end',
        nameRotate: 0,
        nameGap: 10,
        nameTextStyle: {
          color: '#004D39', 
          fontSize: 10.5, 
          fontWeight: '500'
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#68BB9A', width: 0.37 } },
        axisLabel: {
          color: '#004D39',
          formatter: '{value}',
          fontWeight: '500',
          fontSize: 10.5
        },
      },

      series: series.map((s, idx) => ({
        name: s.name,
        type: 'bar',
        data: s.values,
        itemStyle: { color: s.color },
        cursor: 'default',
        emphasis: {
          itemStyle: { cursor: 'default' },
        },
        
        barWidth: barWidthPercent,
        barGap: idx === 0 ? '0%' : '-100%',
        barCategoryGap: '10%',
        z: idx + 1,
      }))
    };
  }, [labels, series]);

  const { value: totalValue, unit: totalUnit } = formatVolume(summary.totalUsed);

  return (
    <CardContainer>
      <TitleRow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Title>Uso de água</Title>
          <Tooltip text={DefaultTooltipMessages.graphCard}>
            <InfoIconWrapper>
              <IconInfoCircle size={18} />
            </InfoIconWrapper>
          </Tooltip>
        </div>

        <SelectRoot value={range} onValueChange={(value: string) => setRange(value as TimeRange)}>
          <SelectTrigger asChild>
            <SelectTrigger>
              <SelectValue />
              <SelectIcon><IconChevronDown size={20} /></SelectIcon>
            </SelectTrigger>
          </SelectTrigger>

          <Select.Portal>
            <SelectContent >
              <SelectViewport>
                {optionsList.map(o => (
                  <SelectItem key={o.value} value={o.value}>
                    <ItemText>{o.label}</ItemText>
                    <ItemIndicator><IconCheck size={20} /></ItemIndicator>
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select.Portal>
        </SelectRoot>
      </TitleRow>

      <ContentWrapper>
        <SummaryRow>
          {/* TOTAL */}
          <SummaryItem positive={summary.totalChange >= 0} >
            <span className="label">Total</span>

            <Metrics>
              <div className="valueGroup">
                <span className="valueNumber">{totalValue} </span>
                <span className="valueUnit">{totalUnit} </span>
              </div>

              {/* seta + %  (só UM bloco!) */}
              <ChangeGroup positive={summary.totalChange >= 0}>
                {summary.totalChange >= 0
                  ? <IconTriangleFilled size={8} />          
                  : <IconTriangleInvertedFilled size={8} />
                }
                <ChangeValue>{Math.abs(summary.totalChange)}%</ChangeValue>
              </ChangeGroup>
            </Metrics>
          </SummaryItem>

          {/* REUTILIZADA */}
          <SummaryItem positive={summary.reusedChange >= 0}>
            <span className="label">Recuperada</span>

            <Metrics>
              <div className="valueGroup">
                <span className="valueNumber">{summary.reusedPercent}</span>
                <span className="valueUnit">%</span>
              </div>

              <ChangeGroup positive={summary.reusedChange >= 0}>
                {summary.reusedChange >= 0
                  ? <IconTriangleFilled size={8} />
                  : <IconTriangleInvertedFilled size={8} />
                }
                <ChangeValue>{Math.abs(summary.reusedChange)}%</ChangeValue>
              </ChangeGroup>
            </Metrics>
          </SummaryItem>

          {/* CONSUMIDA */}
          <SummaryItem positive={summary.consumedChange >= 0}>
            <span className="label">Consumida</span>

            <Metrics>
              <div className="valueGroup">
                <span className="valueNumber">{summary.consumedPercent}</span>
                <span className="valueUnit">%</span>
              </div>

              <ChangeGroup positive={summary.consumedChange >= 0}>
                {summary.consumedChange >= 0
                  ? <IconTriangleFilled size={8} />
                  : <IconTriangleInvertedFilled size={8} />
                }
                <ChangeValue>{Math.abs(summary.consumedChange)}%</ChangeValue>
              </ChangeGroup>
            </Metrics>
          </SummaryItem>
        </SummaryRow>

        <GraphContainer style={{ height: 300 }}>
          <ReactECharts
            option={option}
            style={{ width: '100%', height: '100%' }}
            notMerge
            lazyUpdate
          />
        </GraphContainer>
      </ContentWrapper>
    </CardContainer>
  );
};

export default GraphCard;
