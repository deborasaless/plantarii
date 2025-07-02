import React, { useEffect, useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { TbEdit } from "react-icons/tb";
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  ContentRow,
  TextContainer,
  TextValue,
  TextUnit,
  EditIconWrapper,
  CenterDot,
  MinuteHand,
  HourHand,
  Tick,
  Outline,
  Slice,
  ClockSVGContainer
} from './styles';
import type { LightingCardData } from '../../../../mocks/lightingCardMock';

export interface LightingCardProps {
  data: LightingCardData;
}

const HOURS = 24;
const RADIUS = 32;
const CENTER = 40;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function describeSlice(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    `L ${cx} ${cy}`,
    'Z',
  ].join(' ');
}

const LightingCard: React.FC<LightingCardProps> = ({ data }) => {
  const [editMode, setEditMode] = useState(false);
  const [active, setActive] = useState<boolean[]>(() => Array(HOURS).fill(false));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());
  
  // Atualiza a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSlice = (i: number) => {
    if (!editMode) return;
    setActive(a => {
      const copy = [...a];
      copy[i] = !copy[i];
      return copy;
    });
  };

  // Calcula ângulo para ponteiros
  const minAngle = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
  const hourAngle = ((now.getHours() + now.getMinutes() / 60) / HOURS) * 360;

  return (
    <CardContainer>
      <TitleRow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Title>Iluminação</Title>
            <Tooltip text={DefaultTooltipMessages.lightingCard}>
            <InfoIconWrapper>
                <IconInfoCircle size={18} />
            </InfoIconWrapper>
            </Tooltip>
        </div>
        <EditIconWrapper onClick={() => setEditMode(e => !e)}>
            <TbEdit size={24} />
        </EditIconWrapper>
      </TitleRow>

        <ContentRow>
            <ClockSVGContainer>
              {Array.from({ length: HOURS }).map((_, i) => {
                const sliceSize = 360 / HOURS;
                const start = i * sliceSize;
                const end = start + sliceSize;
                const d = describeSlice(CENTER, CENTER, RADIUS, start, end);
                return (
                  <Slice
                    key={i}
                    d={d}
                    active={active[i]}
                    hovered={hoverIndex === i}
                    editMode={editMode}
                    onClick={() => toggleSlice(i)}
                    onMouseEnter={() => editMode && setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                );
              })}

              <Outline cx={CENTER} cy={CENTER} r={RADIUS} />

              {Array.from({ length: HOURS }).map((_, i) => {
                const angle = (i / HOURS) * 360;
                const outer = polarToCartesian(CENTER, CENTER, RADIUS, angle);
                const inner = polarToCartesian(
                  CENTER,
                  CENTER,
                  RADIUS - (i % 6 === 0 ? 7 : 4),
                  angle
                );
                return (
                  <Tick
                    key={i}
                    x1={outer.x}
                    y1={outer.y}
                    x2={inner.x}
                    y2={inner.y}
                    major={i % 6 === 0}
                  />
                );
              })}

              {/* ponteiros */}
              <HourHand
                x1={CENTER}
                y1={CENTER}
                x2={polarToCartesian(CENTER, CENTER, RADIUS * 0.5, hourAngle).x}
                y2={polarToCartesian(CENTER, CENTER, RADIUS * 0.5, hourAngle).y}
              />
              <MinuteHand
                x1={CENTER}
                y1={CENTER}
                x2={polarToCartesian(CENTER, CENTER, RADIUS * 0.8, minAngle).x}
                y2={polarToCartesian(CENTER, CENTER, RADIUS * 0.8, minAngle).y}
              />

              <CenterDot cx={CENTER} cy={CENTER} r={2.5} />
            </ClockSVGContainer>
            <TextContainer>
                <TextValue>"q"</TextValue>
                <TextUnit>a</TextUnit>
            </TextContainer>
        </ContentRow>
    </CardContainer>
  );
};

export default LightingCard;