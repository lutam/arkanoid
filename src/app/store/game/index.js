import mutations from './mutations';
import actions from './actions';
import initialState from './initialState';

const GameModule = {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
};

export default GameModule;
