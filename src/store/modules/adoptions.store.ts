import { Adoption, APIAdoption } from '@/@types/Adoptions';
import { adoptionsRequests } from '@/services/api/requests';
import { Module } from 'vuex';

type AdoptionsModuleState = {
  adoptions: Adoption[];
  isLoading: boolean;
};

const INITIAL_STATE = (): AdoptionsModuleState => ({
  adoptions: [],
  isLoading: false,
});

const adoptionsModule: Module<AdoptionsModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getAdoptions: (state) => state.adoptions,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchAdoptions({ commit }) {
      commit('setIsLoading', true);

      const mock: Adoption[] = [
        {
          id: 'f208d687-57ee-41e3-b5e9-0ba7a6cf0fe4',
          animalId: '8880a8d5-c158-47e6-a3a8-2f0f6ed827f3',
          adopter: {
            name: 'Tiago da Costa Dias',
            phone: '19912345678',
            address: {
              cep: '13802-310',
              street: 'Rua Moizéz Bento Moretto',
              number: 260,
              complement: '',
              district: 'Parque das Laranjeiras',
              city: 'Mogi Mirim',
              state: 'SP',
            },
          },
        },
        {
          id: 'c12bf715-571a-43b6-a9d9-119ce4804b67',
          animalId: '1a1f9f8f-dc57-4714-9706-956b3a25bc17',
          adopter: {
            name: 'José Lima',
            phone: '3580808080',
            address: {
              cep: '13802-456',
              street: 'Rua Amélia de Camargo Azevedo',
              number: 189,
              complement: '',
              district: 'Loteamento Linda Chaib',
              city: 'Mogi Mirim',
              state: 'SP',
            },
          },
        },
      ];

      setTimeout(() => {
        commit('setAdoptions', mock);
        commit('setIsLoading', false);
      }, 2000);
    },

    async addAdoption(_, adoption: Omit<APIAdoption, 'id'>) {
      const { status, data } = await adoptionsRequests.add(adoption);

      return {
        status: status,
        message:
          status === 201
            ? 'Adoção cadastrada com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteAdoption(_, adoptionId: string) {
      const response = await adoptionsRequests.remove(adoptionId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateAdoption(_, adoption: APIAdoption) {
      const { status, data } = await adoptionsRequests.update(adoption);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setAdoptions(state, payload: Adoption[]) {
      state.adoptions = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default adoptionsModule;
