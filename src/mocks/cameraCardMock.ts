export interface CameraCardData {
  lightsOn: boolean;
  sprinklersOn: boolean;
  cameraSrc: string;
}

export const cameraMock: CameraCardData = {
  lightsOn: true,
  sprinklersOn: false,
  cameraSrc: 'https://192.168.3.233/',  // troque pelo src real ou URL de teste
};