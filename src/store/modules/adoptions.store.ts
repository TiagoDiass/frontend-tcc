import { Adoption, APIAdoption } from '@/@types/Adoptions';
import { adoptionsRequests } from '@/services/api/requests';
import { convertAPIAdoptionsToAdoptions } from '@/utils/converters';
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

      const mock: APIAdoption[] = [
        {
          id: 'f208d687-57ee-41e3-b5e9-0ba7a6cf0fe4',
          animal: {
            id: '1cafbb52-c964-4e24-af09-46cc988a93b8',
            name: 'dudu',
            type: 'dog',
            size: 'P',
            gender: 'M',
            pictureUrl:
              'https://images.unsplash.com/photo-1583511666372-62fc211f8377?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9nfHx8fHx8MTYzMjkxNjIwMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=450',
          },
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
          animal: {
            id: '1a1f9f8f-dc57-4714-9706-956b3a25bc17',
            name: 'Beethoven',
            type: 'dog',
            size: 'G',
            gender: 'M',
            pictureUrl:
              'http://4.bp.blogspot.com/-OrftBQM3zzY/UNhRHXoeirI/AAAAAAAAACk/8_Cqm1vQqcQ/s1600/beethoven.jpg',
          },
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
        {
          id: '4cdba18e-d206-4ea8-a395-0e18f8279d3c',
          animal: {
            id: '53027579-2391-4110-ac19-c316e53f7fa0',
            name: 'Garfield',
            type: 'cat',
            size: 'P',
            gender: 'M',
            pictureUrl:
              'https://marretabionica.com.br/wp-content/uploads/2018/11/garfield-the-movie.jpg',
          },
          adopter: {
            name: 'Sophia Isabelly Heloise Dias',
            phone: '1838065248',
            address: {
              cep: '16025-455',
              street: 'Rua Aguapeí',
              complement: 'de 1682/1683 a 2398/2399',
              district: 'Jardim do Prado',
              city: 'Araçatuba',
              state: 'SP',
              number: 140,
            },
          },
        },
      ];

      setTimeout(() => {
        commit('setAdoptions', convertAPIAdoptionsToAdoptions(mock));
        commit('setIsLoading', false);
      }, 1000);
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
