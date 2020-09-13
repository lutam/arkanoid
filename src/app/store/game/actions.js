import {
  CHANGE_LIVES,
  UPDATE_BRICKS,
  UPDATE_MESSAGES,
  UPDATE_POINTS,
  RESET_GAME,
  INCREMENT_LEVEL,
  SET_RUNNING_STATUS,
  TOGGLE_PAUSE,
} from './mutation-type';

export default {
  startGame({ commit, state, dispatch }) {
    commit(SET_RUNNING_STATUS, true);
    if (state.isPaused) {
      dispatch('togglePause');
    }
  },
  togglePause({ commit }) {
    commit(TOGGLE_PAUSE);
  },
  hitBrick({ commit, state, dispatch }, brickIndex) {
    const newBricks = [...state.bricks];
    newBricks[brickIndex].available = false;
    commit(UPDATE_POINTS, state.points + 100);
    commit(UPDATE_BRICKS, newBricks);
    const stillBricksAvailable = newBricks.find((b) => b.available && b.type === 1);
    if (!stillBricksAvailable && state.isRunning) {
      dispatch('toggleMessage', state.level === 2 ? 'game_won' : 'level_completed');
    }
  },
  stopGame({ commit, state, dispatch }) {
    commit(SET_RUNNING_STATUS, false);
    dispatch('togglePause');
    dispatch('resetScreenPositions');
    commit(CHANGE_LIVES, state.lives - 1);
    if (state.lives === 0) {
      dispatch('toggleMessage', 'game_over');
    }
  },
  resetScreenPositions() {
    this.dispatch('ball/resetValues');
    this.dispatch('platform/resetValues');
  },
  toggleMessage({ commit, state, dispatch }, messageCode) {
    if (!state.isPaused) {
      dispatch('togglePause');
    }
    const updatedMessages = state.messages.map((m) => (
      m.code === messageCode
        ? { ...m, showed: !m.showed }
        : m
    ));
    commit(UPDATE_MESSAGES, updatedMessages);
  },
  nextLevel({ commit, dispatch }) {
    commit(INCREMENT_LEVEL);
    commit(SET_RUNNING_STATUS, false);
    dispatch('resetScreenPositions');
    dispatch('toggleMessage', 'level_completed');
  },
  newGame({ commit, dispatch }) {
    dispatch('resetScreenPositions');
    commit(RESET_GAME);
  },
};
