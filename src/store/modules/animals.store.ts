import { Animal } from '@/@types/Animals';
import { Module } from 'vuex';
import { mockAnimals } from './mock';

type AnimalsModuleState = {
  animals: Animal[];
  isLoading: boolean;
};

const INITIAL_STATE = (): AnimalsModuleState => ({
  animals: [] as Animal[],
  isLoading: false,
});

const animalsModule: Module<AnimalsModuleState, null> = {
  namespaced: true,

  state: INITIAL_STATE(),

  getters: {
    getAnimals: (state) => state.animals,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchAnimals({ commit }) {
      commit('setIsLoading', true);

      setTimeout(() => {
        commit('setAnimals', mockAnimals);
        commit('setIsLoading', false);
      }, 2000);
    },
  },

  mutations: {
    setAnimals(state, payload: Animal[]) {
      state.animals = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default animalsModule;
