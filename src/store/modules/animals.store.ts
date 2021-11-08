import { Animal, APIAnimal } from '@/@types/Animals';
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

type AddAnimalActionParams = Omit<APIAnimal, 'id'>;

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

    async addAnimal(_, animal: AddAnimalActionParams) {
      const { status, data } = await animalsRequests.add(animal);

      return {
        status: status,
        message:
          status === 201
            ? 'Animal cadastrado com sucesso'
            : data.errors?.join(', '),
      };
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
