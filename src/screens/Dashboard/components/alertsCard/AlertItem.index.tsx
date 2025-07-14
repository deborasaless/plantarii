import React, { useState, useRef } from 'react';
import {
  IconInfoCircleFilled,
  IconBellFilled,
  IconAlertTriangleFilled
} from '@tabler/icons-react';
import type { Alert } from '../../../../mocks/alertsCardMock';
import {
  AlertRow,
  AlertIconWrapper,
  AlertTime,
  AlertText
} from './styles';

const THRESHOLD = 50;
const DRAG_START = 5;
const MAX_DRAG_DANGER = 50;

const iconForType = {
  info:    <IconInfoCircleFilled      size={17} style={{ color: '#3B82F6' }} />,
  warning: <IconBellFilled           size={17} style={{ color: '#EAB308' }} />,
  danger:  <IconAlertTriangleFilled  size={17} style={{ color: '#F0464A' }} />,
};

interface AlertItemProps {
  alert: Alert;
  removing: boolean;
  onRemove: (id: string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, removing, onRemove }) => {
  const [offset, setOffset] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setPressing(true);
    startX.current = e.clientX;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pressing) return;
    const delta = e.clientX - startX.current;

    // só entra em dragging após DRAG_START
    if (!dragging && Math.abs(delta) > DRAG_START) {
      setDragging(true);
    }

    if (!dragging) return;

    if (alert.type === 'danger') {

      // 1) limitar o offset ao máximo
      const clamped = Math.min(Math.max(delta, 0), MAX_DRAG_DANGER);
      setOffset(clamped);

      // 2) se passou do limiar, parar drag e reverter via transition
      if (delta >= MAX_DRAG_DANGER) {

        // interrompe captura de ponteiro
        ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
        setDragging(false);
        setPressing(false);

        // garante que estamos no clamped
        setOffset(MAX_DRAG_DANGER);

        // no próximo frame, volta a zero (aplicando a transition)
        requestAnimationFrame(() => setOffset(0));
      }

    } else {
      setOffset(Math.max(delta, 0));
    }
  };

  const handlePointerUpOrLeave = (e: React.PointerEvent) => {
    setPressing(false);

    if (dragging) {
      if (alert.type === 'danger') {
        // já reverteu no move
        setOffset(0);
      } else {
        if (offset > THRESHOLD) {
          onRemove(alert.id);
        } else {
          setOffset(0);
        }
      }
    }

    setDragging(false);
    ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <AlertRow
      type={alert.type}
      removing={removing}
      shaking={pressing && !dragging}
      style={{
        transform: removing
          ? undefined
          : dragging
            ? `translateX(${offset}px) scale(1.04)`
            : undefined,
        transition: dragging ? 'none' : undefined,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
    >
      <AlertIconWrapper>{iconForType[alert.type]}</AlertIconWrapper>
      <AlertTime>[{alert.time}]</AlertTime>
      <AlertText>{alert.message}</AlertText>
    </AlertRow>
  );
};

export default AlertItem;
