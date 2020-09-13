import mutations from './mutations';
import initialState from './initialState';
import actions from './actions';

const BallModule = {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
};

export default BallModule;
