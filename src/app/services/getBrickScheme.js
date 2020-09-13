import LEVEL1 from '../data/bricksSchemes/level-1';
import LEVEL2 from '../data/bricksSchemes/level-2';

const makeBrickScheme = (brickMatrix) => brickMatrix
  .map((row, top) => row.map((col, left) => ({
    left, top, type: col, available: true,
  })))
  .flat(1)
  .filter((b) => b.type !== 0);

export default (level) => {
  switch (level) {
    case 1:
      return makeBrickScheme(LEVEL1);
    case 2:
      return makeBrickScheme(LEVEL2);
    default:
      return makeBrickScheme(LEVEL1);
  }
};
