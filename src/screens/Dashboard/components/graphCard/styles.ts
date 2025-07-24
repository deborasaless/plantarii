import styled from 'styled-components';
import * as Select from '@radix-ui/react-select';

export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;
  box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 53%;
  gap: 5px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #002E20;
  margin: 0;
`

export const InfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #002E20;
  cursor: pointer;

  transition: transform 0.3s ease;

  &:hover { transform: scale(1.2); }
`

export const SelectRoot = styled(Select.Root)`
  border: none;

`;

export const SelectTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #B6E8BD;
  border-radius: 6px;
  gap: 0.3rem;
  height: 24px;
  width: 97px;
  padding: 0 0.5rem;
  border: none;
  color: #002E20;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;

  transition: color 0.2s ease, transform 0.3s ease;

  &:hover { 
    transform: scale(1.1); 
    color: #004d38d6; 
    border: none; 
  }

  &:focus {
    outline: none;
    box-shadow: none !important;
    border: none;
  }

  &[data-state='open'] {
    transform: scale(1.1);
}
`;
  

export const SelectValue = styled(Select.Value)`
  display: flex;
  align-items: center;
  text-align: left;
  color: #002E20;
`;

export const SelectIcon = styled(Select.Icon)`
  display: flex;
  align-items: center;
`;

export const SelectContent = styled(Select.Content).attrs({
  position: 'popper',
  side: 'bottom',
  align: 'end',
  sideOffset: 4,
  alignOffset: 0,
})`
  background: #EAFBE9;
  border-radius: 6px;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 0.5rem;
  width: 115px;
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: 0;
`;

export const SelectItem = styled(Select.Item)`
  font-size: 0.8rem;
  font-weight: 500;
  color: #002E20;
  
  padding: 0.25rem 0.5rem;
  border: 2px solid transparent !important;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
  height: 30px;

  &:focus {
    outline: none;
    box-shadow: none !important;
  }

  &[data-highlighted] {
    background-color: #B6E8BD;
    border: 2px solid #549665 !important;
    border-radius: 6px;
    box-shadow: none !important;
    outline: none !important;
  }
`;

export const ItemText = styled(Select.ItemText)`flex:1;`;

export const ItemIndicator = styled(Select.ItemIndicator)`
  color: #004D20;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  gap: 4%;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SummaryItem = styled.div<{ positive: boolean; width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: left;
  border-left: 2px solid #9FDEA7;
  gap: 0.25rem;
  padding: 0.2rem 0 0.2rem 0.2rem;
  width: ${({ width }) => width || 'fit-content'};

  .label {
    font-size: 0.68rem;
    font-weight: 400;
    color: #004D39;
  }
`;

export const Metrics = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: 500;
  color: #002E20;

  .valueGroup {
    display: flex;
    align-items: baseline;
    gap: 0;
  }

  .valueNumber {
    font-size: 1rem;
    line-height: 1;
  }

  .valueUnit {
    font-size: 0.9rem;
    line-height: 1;
  }
`;

export const ChangeGroup = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ positive }) => (positive ? '#005C11' : '#F0464A')};
`;

export const ChangeValue = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`;

export const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
