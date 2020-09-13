import {
  SET_BALL_POSITION,
  SET_BALL_SPEED,
  RESET_VALUES,
} from './mutation-type';

export default {
  setBallPosition({ commit }, ballCenterPosition) {
    commit(SET_BALL_POSITION, ballCenterPosition);
  },
  setBallSpeed({ commit }, ballSpeed) {
    commit(SET_BALL_SPEED, ballSpeed);
  },
  resetValues({ commit }) {
    commit(RESET_VALUES);
  },
};
