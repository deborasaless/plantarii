import React, { useEffect, useState } from 'react';
import {
  IconInfoCircle,
  IconBulbFilled,
  IconCheck,
  IconRotate,
  IconMinus,
  IconPlus,
  IconSwitch3,
  IconArrowBackUp
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
  IconWrapper,
  ContentRow,
  TextContainer,
  LegendContainer,
  LegendItem,
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
  CiclesText,
  RightContainer,
  CycleControls,
  CounterButton,
  CycleInput,
  DistributeButton,
  ButtonsContainer2,
  LeftContainer,
  SwitchButton
} from './styles';

export interface LightingCardProps {
  data: LightingCardData;
  onClockHoverStart?: () => void;
  onClockHoverEnd?: () => void;
}

const HOURS = 24;
const RADIUS = 48;
const CENTER = 50;

type ConfirmType = 'save' | 'discard' | 'restore' | null;

// padrão de fábrica
const factoryActive = Array(HOURS)
  .fill(false)
  .map((_, i) => i < 6 || (i >= 12 && i < 18));

// compara p/ ver se houve alteração
const hasChanges = (a: boolean[], b: boolean[]) =>
  a.length === b.length && a.some((v, i) => v !== b[i]);

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function describeSlice(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y} L ${cx} ${cy} Z`;
}

const LightingCard: React.FC<LightingCardProps> = ({
  data,
  onClockHoverStart,
  onClockHoverEnd
}) => {
  const [editMode, setEditMode] = useState(false);
  const [active, setActive] = useState<boolean[]>(factoryActive);
  const [backup, setBackup] = useState<boolean[]>(factoryActive);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<ConfirmType>(null);
  const [now, setNow] = useState(new Date());
  const [isDistributed, setIsDistributed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const enterEdit = () => {
    setBackup([...active]);
    setEditMode(true);
  };
  const handleAction = (a: ConfirmType) => setConfirm(a);

  const runConfirmed = () => {
    if (confirm === 'save') {
      console.log('Salvando', active);
    } else if (confirm === 'restore') {
      setActive(factoryActive);
    }
    setEditMode(false);
    setConfirm(null);
  };

  const cancelConfirmed = () => {
    setActive(backup);
    setEditMode(false);
    setConfirm(null);
  };

  const keepEditing = () => setConfirm(null);

  const toggleSlice = (i: number) => {
    setIsDistributed(false);
    setActive(a => {
      const c = [...a]; c[i] = !c[i]; return c;
    });
  };

  const transitions = active.reduce((cnt, cur, i, arr) =>
    i === 0 ? 0 : cnt + (cur !== arr[i - 1] ? 1 : 0), 0);

  const [cycleCount, setCycleCount] = useState(transitions + 1);

  const [inputValue, setInputValue] = useState(cycleCount.toString());

  useEffect(() => {
    const trans = active.reduce((cnt, cur, i, arr) =>
      i === 0 ? 0 : cnt + (cur !== arr[i - 1] ? 1 : 0), 0);
    const cc = trans + 1;
    setCycleCount(cc);
    setInputValue(cc.toString());
  }, [active, editMode]);

  // distribui active em blocos iguais ao cycleCount
  const distribute = (count = cycleCount) => {
    const cuts = Array.from(
      { length: count + 1 },
      (_, i) => Math.round((i * HOURS) / count)
    );
    const arr = Array(HOURS).fill(false);
    for (let c = 0; c < count; c++) {
      for (let j = cuts[c]; j < cuts[c+1]; j++) {
        arr[j % HOURS] = c % 2 === 0;
      }
    }
    setActive(arr);
  };

  // inverte cada slice
  const invert = () => {
    setActive(a => a.map(v => !v));
  };

  // +/- handlers
  const inc = () => {
    setCycleCount(old => {
      const next = Math.min(old + 1, HOURS);
      distribute(next);
      return next;
    });
  };

  const dec = () => {
    setCycleCount(old => {
      const next = Math.max(old - 1, 1);
      distribute(next);
      return next;
    });
  };

  const minAngle = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
  const hourAngle = ((now.getHours() + now.getMinutes() / 60) / HOURS) * 360;

  return (
    <CardContainer>
      <TitleRow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Title>Iluminação</Title>
          <Tooltip text={DefaultTooltipMessages.lightingCard}>
            <InfoIconWrapper><IconInfoCircle size={18} /></InfoIconWrapper>
          </Tooltip>
        </div>
        <EditIconWrapper>
          {editMode ? (
            confirm ? (
              <IconWrapper
                hoverColor="#004d38d6"
                scale={1.2}
                onClick={keepEditing}
              >
                <IconArrowBackUp size={24} style={{ backgroundColor: '#B6E8BD', borderRadius: '6px' }} />
              </IconWrapper>
            ) : (
              <>
                <IconWrapper
                  hoverColor="#004d38d6"
                  scale={1.2}
                  onClick={() => handleAction('restore')}
                >
                  <IconRotate size={24} />
                </IconWrapper>
                <IconWrapper
                  hoverColor="#004d38d6"
                  scale={1.2}
                  onClick={() => {
                    if (hasChanges(active, backup)) {
                      handleAction('save');
                    } else {
                      setEditMode(false);
                    }
                  }}
                >
                  <IconCheck
                    size={24}
                    style={{ backgroundColor: '#B6E8BD', borderRadius: '6px' }}
                  />
                </IconWrapper>
              </>
            )
          ) : (
            <IconWrapper hoverColor="#004d38d6" scale={1.2} onClick={enterEdit}>
              <TbEdit size={24} />
            </IconWrapper>
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
            <Button bgColor="#F0464A" color="#FFF"
              hoverBorderColor="#BC2727" onClick={cancelConfirmed}>
              Não
            </Button>
            <Button bgColor="#B6E8BD" color="#002E20"
              hoverBorderColor="#2CA586" onClick={runConfirmed}>
              Sim
            </Button>
          </ButtonsContainer>
        </ConfirmContainer>
      ) : (
        <ContentRow>
          <LeftContainer>
            <ClockSVGContainer onMouseEnter={onClockHoverStart} onMouseLeave={onClockHoverEnd} >
                {Array.from({ length: HOURS }).map((_, i) => {
                const slice = 360 / HOURS;
                const d = describeSlice(CENTER, CENTER, RADIUS, i * slice, i * slice + slice);
                return (
                    <Slice key={i} d={d}
                    active={active[i]} hovered={hoverIndex === i} editMode={editMode}
                    onClick={() => toggleSlice(i)}
                    onMouseEnter={() => editMode && setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                    />
                );
                })}
                
                {Array.from({ length: HOURS }).map((_, i) => {
                const a = (i / HOURS) * 360;
                const o = polarToCartesian(CENTER, CENTER, RADIUS, a);
                const inr = polarToCartesian(CENTER, CENTER,
                    RADIUS - (i % 6 === 0 ? 12 : 8.5), a);
                return <Tick key={i} x1={o.x} y1={o.y}
                    x2={inr.x} y2={inr.y} major={i % 6 === 0} />;
                })}

                <Outline cx={CENTER} cy={CENTER} r={RADIUS} />

                <HourHand
                  x1={CENTER} y1={CENTER}
                  x2={polarToCartesian(CENTER, CENTER, RADIUS * 0.45, hourAngle).x}
                  y2={polarToCartesian(CENTER, CENTER, RADIUS * 0.45, hourAngle).y}
                />
                <MinuteHand
                  x1={CENTER} y1={CENTER}
                  x2={polarToCartesian(CENTER, CENTER, RADIUS * 0.65, minAngle).x}
                  y2={polarToCartesian(CENTER, CENTER, RADIUS * 0.65, minAngle).y}
                />
                <CenterDot cx={CENTER} cy={CENTER} r={4.5} />
            </ClockSVGContainer>

            <LegendContainer>
                <LegendItem dotColor="#003423">Apagada</LegendItem>
                <LegendItem dotColor="#DDF1E1">Acesa</LegendItem>
            </LegendContainer>
          </LeftContainer>

          <RightContainer>
            {editMode ? (
                <EditContainer>
                    <CiclesContainer>
                    <CycleControls>
                        <CounterButton onClick={dec}>
                            <IconMinus size={24} />
                        </CounterButton>

                        <CycleInput
                        type="number"
                        max={HOURS}
                        value={inputValue}
                        onChange={e => {
                          const txt = e.target.value;
                          setInputValue(txt);

                          if (txt === '') return;

                          const num = Number(txt);
                          if (!Number.isNaN(num)) {
                            if (num > HOURS) {
                              // cola no máximo
                              setInputValue(HOURS.toString());
                              setCycleCount(HOURS);
                              distribute(HOURS);
                            } else if (num >= 1) {
                              setCycleCount(num);
                              distribute(num);
                            }
                          }
                        }}
                        onBlur={() => {
                          if (inputValue.trim() === '') {
                            const safe = Math.max(1, Math.min(cycleCount, HOURS));
                            setCycleCount(safe);
                            setInputValue(safe.toString());
                            distribute(safe);
                          }
                        }}
                      />

                        <CounterButton onClick={inc}>
                            <IconPlus size={24} />
                        </CounterButton>

                    </CycleControls>
                        <CiclesText>Ciclos</CiclesText>
                    </CiclesContainer>

                    <ButtonsContainer2>
                        <DistributeButton onClick={() => distribute()}>
                            Distribuir
                        </DistributeButton>

                        <SwitchButton>
                            <IconSwitch3 size={20} onClick={invert} />
                        </SwitchButton>

                    </ButtonsContainer2>
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
          </RightContainer>
        </ContentRow>
      )}
    </CardContainer>
  );
};

export default LightingCard;
