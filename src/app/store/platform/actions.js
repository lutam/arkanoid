import {
  SET_PLATFORM_POSITION,
  SET_PLATFORM_SPEED,
  RESET_VALUES,
} from './mutation-type';

export default {
  setPlatformPosition({ commit }, platformPosition) {
    commit(SET_PLATFORM_POSITION, platformPosition);
  },
  setPlatformSpeed({ commit }, platformSpeed) {
    commit(SET_PLATFORM_SPEED, platformSpeed);
  },
  resetValues({ commit }) {
    commit(RESET_VALUES);
  },
};
