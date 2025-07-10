export interface CameraCardData {
  lightsOn: boolean;
  sprinklersOn: boolean;
  cameraSrc: string;
}

export const cameraMock: CameraCardData = {
  lightsOn: true,
  sprinklersOn: false,
  cameraSrc: 'pipitin_toto.jpg',  // troque pelo src real ou URL de teste
};