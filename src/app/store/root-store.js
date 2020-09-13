import Vue from 'vue';
import Vuex from 'vuex';
import BallModule from './ball';
import PlatformModule from './platform';
import GameModule from './game';

Vue.use(Vuex);

const rootStore = new Vuex.Store({
  modules: {
    ball: BallModule,
    game: GameModule,
    platform: PlatformModule,
  },
});

export default rootStore;
