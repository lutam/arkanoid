import getBricksSchemeByLevel from '../../services/getBrickScheme';

export default () => {
  const initialState = {
    bricks: getBricksSchemeByLevel(1).map((b) => ({ ...b, available: true })),
    isRunning: false,
    isPaused: true,
    lives: 3,
    level: 1,
    points: 0,
    messages: [
      { code: 'time_out', showed: false },
      { code: 'game_over', showed: false },
      { code: 'level_completed', showed: false },
      { code: 'game_won', showed: false },
    ],
  };

  return { ...initialState };
};
