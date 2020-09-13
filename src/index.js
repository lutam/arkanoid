import Vue from 'vue';
import App from './app/components/App.vue';
import './assets/scss/globals.scss';
import store from './app/store/root-store';

// eslint-disable-next-line no-undef
if (document.getElementById('app')) {
  new Vue({
    store,
    components: {
      'app-root': App,
    },
  }).$mount('#app');
}
