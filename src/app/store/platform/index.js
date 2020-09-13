import mutations from './mutations';
import initialState from './initialState';
import actions from './actions';

const PlatformModule = {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
};

export default PlatformModule;
