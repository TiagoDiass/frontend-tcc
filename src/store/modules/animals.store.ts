import { Animal } from '@/@types/Animals';
import { animalsRequests } from '@/services/api/requests';
import { convertAPIAnimalsToAnimals } from '@/utils/converters';
import { Module } from 'vuex';

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

      const response = await animalsRequests.getAll();

      commit('setAnimals', convertAPIAnimalsToAnimals(response.data.data));
      commit('setIsLoading', false);
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
