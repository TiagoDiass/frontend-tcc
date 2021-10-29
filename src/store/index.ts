import Vue from 'vue';
import Vuex from 'vuex';
import animalsModule from './modules/animals.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    animals: animalsModule,
  },
});
