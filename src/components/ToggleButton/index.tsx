import React from 'react';
import {
  ToggleContainer,
  ToggleOption,
  ToggleSlider
} from './styles';

export interface ToggleProps {
  labels: [string, string];
  initialActiveIndex?: 0 | 1;
  activeIndex?: 0 | 1;
  onChange?: (activeIndex: 0 | 1) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  labels,
  initialActiveIndex = 0,
  activeIndex: activeIndexProp,
  onChange
}) => {
  const isControlled = activeIndexProp !== undefined;
  const [internalIndex, setInternalIndex] = React.useState<0 | 1>(initialActiveIndex);
  const activeIndex = isControlled ? activeIndexProp! : internalIndex;

  const handleClick = () => {
    const next = activeIndex === 0 ? 1 : 0;
  
    if (!isControlled) {
      setInternalIndex(next);
    }

    onChange?.(next);
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <ToggleSlider activeIndex={activeIndex} />
      <ToggleOption active={activeIndex === 0}>{labels[0]}</ToggleOption>
      <ToggleOption active={activeIndex === 1}>{labels[1]}</ToggleOption>
    </ToggleContainer>
  );
};

export default Toggle;
