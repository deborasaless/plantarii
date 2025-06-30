export interface TankLevelData {
  absoluteValue: number;
  percentValue: number;
  isLow: boolean;
}

export const tankLevelLow: TankLevelData = {
  absoluteValue: 120,   // mL
  percentValue: 12,     // %
  isLow: true,
};

export const tankLevelNormal: TankLevelData = {
  absoluteValue: 680,
  percentValue: 68,
  isLow: false,
};
