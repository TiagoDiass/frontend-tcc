import Vue from 'vue';
import Vuex from 'vuex';
import animalsModule from './modules/animals.store';
import servicesModule from './modules/services.store';

Vue.use(Vuex);

export type ActionResponse = {
  status: number;
  message: string;
};

export default new Vuex.Store({
  modules: {
    animals: animalsModule,
    services: servicesModule,
  },
});
