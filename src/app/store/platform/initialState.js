import { ballSize, platformSize } from '../../data/sizes';

export default () => {
  const initialState = {
    vx: 0,
    x: 0,
    xRange: {
      min: -0.5 * platformSize.width,
      max: 0.5 * platformSize.width,
    },
  };

  return { ...initialState };
};
