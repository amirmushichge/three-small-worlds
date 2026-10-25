// Scene transforms use radians for rotation.
export const SCENES = [
  {
    id: '01',
    name: 'train\ncabin',
    src: '/models/train-cabin.glb',
    bg: '#241d22',
    position: [-1.15, 0, 0],
    rotation: [0, 0.5, 0],
    model: { scale: 13.7, position: [-4.49, -0.7, -1.4], rotation: [0.02, 0, 0] },
  },
  {
    id: '02',
    name: 'flying\ncircus',
    src: '/models/flying-circus.glb',
    bg: '#8abce9',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    model: { scale: 0.045, position: [-0.02, 0.1, -2.75], rotation: [0.24, 0.75, -0.03] },
  },
  {
    id: '03',
    name: 'little\ntokyo',
    src: '/models/littlest-tokyo.glb',
    bg: '#c78666',
    position: [1.15, 0, 0],
    rotation: [0, -0.5, 0],
    model: { scale: 0.0085, position: [-0.4, 0.45, -4.8], rotation: [0, 2.56, 0] },
  },
]
