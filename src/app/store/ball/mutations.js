import {
  SET_BALL_SPEED,
  SET_BALL_POSITION,
  RESET_VALUES,
} from './mutation-type';
import { ballSize } from '../../data/sizes';
import initialState from './initialState';

export default {
  [SET_BALL_POSITION](state, payload) {
    state.x = payload.x;
    state.y = payload.y;
    state.xRange = { max: payload.x + ballSize.width / 2, min: payload.x - ballSize.width / 2 };
    state.yRange = { max: payload.y + ballSize.width / 2, min: payload.y - ballSize.width / 2 };
  },
  [SET_BALL_SPEED](state, payload) {
    state.vx = payload.vx;
    state.vy = payload.vy;
  },
  [RESET_VALUES](state) {
    Object.assign(state, initialState());
  },
};
