export interface TankLevelCardData {
  absoluteValue: number;
  percentValue: number;
  isLow: boolean;
}

export const tankLevelLow: TankLevelCardData = {
  absoluteValue: 120,
  percentValue: 12,
  isLow: true,
};

export const tankLevelNormal: TankLevelCardData = {
  absoluteValue: 680,
  percentValue: 68,
  isLow: false,
};
