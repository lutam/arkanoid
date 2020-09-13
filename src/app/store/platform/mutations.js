import {
  SET_PLATFORM_POSITION, SET_PLATFORM_SPEED,
  RESET_VALUES,
} from './mutation-type';
import { platformSize } from '../../data/sizes';
import initialState from './initialState';

export default {
  [SET_PLATFORM_POSITION](state, payload) {
    state.xRange = { max: payload.x + platformSize.width / 2, min: payload.x - platformSize.width / 2 };
    state.x = payload.x;
  },
  [SET_PLATFORM_SPEED](state, payload) {
    state.vx = payload.vx;
  },
  [RESET_VALUES](state) {
    state.x = undefined;
    setTimeout(() => {
      Object.assign(state, initialState());
    }, 100);
  },
};
