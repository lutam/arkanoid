import { ballSize } from '../../data/sizes';

export default () => {
  const initialState = {
    vx: 1.6,
    vy: 1,
    x: 0,
    y: 0,
    xRange: {
      min: -0.5 * ballSize.width,
      max: 0.5 * ballSize.width,
    },
    yRange: {
      min: 0,
      max: ballSize.width,
    },
  };

  return { ...initialState };
};
