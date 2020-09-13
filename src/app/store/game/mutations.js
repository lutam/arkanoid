import {
  SET_RUNNING_STATUS,
  CHANGE_LIVES,
  TOGGLE_PAUSE,
  UPDATE_BRICKS, UPDATE_MESSAGES, UPDATE_POINTS, RESET_GAME, INCREMENT_LEVEL,
} from './mutation-type';
import initialState from './initialState';
import getBrickScheme from '../../services/getBrickScheme';

export default {
  [SET_RUNNING_STATUS](state, payload) {
    state.isRunning = payload;
  },
  [TOGGLE_PAUSE](state) {
    state.isPaused = !state.isPaused;
  },
  [CHANGE_LIVES](state, payload) {
    state.lives = payload;
  },
  [UPDATE_BRICKS](state, payload) {
    state.bricks = payload;
  },
  [UPDATE_MESSAGES](state, payload) {
    state.messages = payload;
  },
  [UPDATE_POINTS](state, payload) {
    state.points = payload;
  },
  [RESET_GAME](state) {
    state.bricks = undefined;
    setTimeout(() => {
      Object.assign(state, initialState());
    }, 400);
  },
  [INCREMENT_LEVEL](state) {
    state.level += 1;
    state.bricks = undefined;
    setTimeout(() => {
      state.bricks = getBrickScheme(state.level);
    }, 400);
  },
};
