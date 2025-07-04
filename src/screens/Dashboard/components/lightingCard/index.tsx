import React, { useEffect, useState } from 'react';
import {
  IconInfoCircle,
  IconBulbFilled,
  IconCheck,
  IconRotate
} from '@tabler/icons-react';
import { TbEdit } from 'react-icons/tb';
import Tooltip from '../../../../components/Tooltip';
import { DefaultTooltipMessages } from '../../../../components/Tooltip/messages';
import type { LightingCardData } from '../../../../mocks/lightingCardMock';
import {
  CardContainer,
  TitleRow,
  Title,
  InfoIconWrapper,
  EditIconWrapper,
  ContentRow,
  TextContainer,
  TextTitle,
  TextValue,
  ClockSVGContainer,
  Slice,
  Outline,
  Tick,
  HourHand,
  MinuteHand,
  CenterDot,
  ConfirmContainer,
  ConfirmMessage,
  ButtonsContainer,
  Button,
  EditContainer,
  CiclesContainer,
  CiclesNumber,
  CiclesText
} from './styles';

export interface LightingCardProps {
  data: LightingCardData;
}

const HOURS = 24;
const RADIUS = 52;
const CENTER = 65;

type ConfirmType = 'save' | 'discard' | 'restore' | null;

// padrão de fábrica
const factoryActive = Array(HOURS)
  .fill(false)
  .map((_, i) => i < 6 || (i >= 12 && i < 18));

// compara p ver se teve alterações
const hasChanges = (arr1: boolean[], arr2: boolean[]) =>
  arr1.length === arr2.length && arr1.some((v, i) => v !== arr2[i]);

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function describeSlice(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y} L ${cx} ${cy} Z`;
}

const LightingCard: React.FC<LightingCardProps> = ({ data }) => {
  const [editMode, setEditMode] = useState(false);
  const [active, setActive] = useState<boolean[]>(factoryActive);
  const [backup, setBackup] = useState<boolean[]>(factoryActive);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<ConfirmType>(null);
  const [now, setNow] = useState(new Date());

  // Relógio ao vivo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ao entrar em edição, salva snapshot
  const enterEdit = () => {
    setBackup([...active]);
    setEditMode(true);
  };

  const handleAction = (action: ConfirmType) => {
    setConfirm(action);
  };

  // executa "Sim"
  const runConfirmed = () => {
    if (confirm === 'save') {
      console.log('Salvando estado', active);
    } else if (confirm === 'restore') {
      setActive(factoryActive);
    }
    setEditMode(false);
    setConfirm(null);
  };

  // executa "Não"
  const cancelConfirmed = () => {
    setActive(backup);
    setEditMode(false);
    setConfirm(null);
  };

  // continua editando
  const keepEditing = () => {
    setConfirm(null);
  };

  // alterna fatia
  const toggleSlice = (i: number) => {
    if (!editMode) return;
    setActive(a => {
      const c = [...a];
      c[i] = !c[i];
      return c;
    });
  };

  // calcula ciclos = transições + 1
  const transitions = active.reduce((count, curr, i, arr) => {
    if (i === 0) return 0;
    return count + (curr !== arr[i - 1] ? 1 : 0);
  }, 0);
  const cycleCount = transitions + 1;

  // ângulos dos ponteiros
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

        <EditIconWrapper>
          {editMode ? (
            <>
                <IconRotate
                    size={24}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleAction('restore')}
                />

                <IconCheck
                    size={24}
                    style={{ cursor: 'pointer', backgroundColor: '#B6E8BD', borderRadius: '6px' }}
                    onClick={() => {
                    if (hasChanges(active, backup)) {
                        handleAction('save');
                    } else {
                        setEditMode(false);
                    }
                    }}
                />
            </>
          ) : (
            <TbEdit size={24} style={{ cursor: 'pointer' }} onClick={enterEdit} />
          )}
        </EditIconWrapper>
      </TitleRow>

      {confirm ? (
        <ConfirmContainer>
          <ConfirmMessage>
            {confirm === 'save'
              ? 'Deseja salvar as alterações?'
              : 'Deseja restaurar o padrão de fábrica?'}
          </ConfirmMessage>

          <ButtonsContainer>
            <Button bgColor="#F0464A" color="#FFFFFF" onClick={cancelConfirmed}>
              Não
            </Button>
            
            <Button bgColor="#DDF1E1" color="#002E20" onClick={keepEditing}>
              Voltar
            </Button>

            <Button bgColor="#003423" color="#FFFFFF" onClick={runConfirmed}>
              Sim
            </Button>

          </ButtonsContainer>
        </ConfirmContainer>
      ) : (
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
                RADIUS - (i % 6 === 0 ? 12 : 8.5),
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

            <HourHand
              x1={CENTER}
              y1={CENTER}
              x2={polarToCartesian(CENTER, CENTER, RADIUS * 0.45, hourAngle).x}
              y2={polarToCartesian(CENTER, CENTER, RADIUS * 0.45, hourAngle).y}
            />
            <MinuteHand
              x1={CENTER}
              y1={CENTER}
              x2={polarToCartesian(CENTER, CENTER, RADIUS * 0.65, minAngle).x}
              y2={polarToCartesian(CENTER, CENTER, RADIUS * 0.65, minAngle).y}
            />
            <CenterDot cx={CENTER} cy={CENTER} r={4.5} />
          </ClockSVGContainer>

          {editMode ? (
            <EditContainer>
              <CiclesContainer>
                <CiclesNumber>{cycleCount}</CiclesNumber>
                <CiclesText>Quantidade de ciclos</CiclesText>
              </CiclesContainer>
            </EditContainer>
          ) : (
            <TextContainer>
              <TextTitle>
                <IconBulbFilled size={24} color="#EAB308" />
                Luz acesa a:
              </TextTitle>
              <TextValue>1:30 / 12 h</TextValue>
            </TextContainer>
          )}
        </ContentRow>
      )}
    </CardContainer>
  );
};

export default LightingCard;
