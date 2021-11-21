import { Service } from '@/@types/Services';
import { APIVoluntary, Voluntary } from '@/@types/Voluntaries';
import { voluntariesRequests } from '@/services/api/requests';
import { Module } from 'vuex';

type VoluntariesModuleState = {
  voluntaries: Voluntary[];
  isLoading: boolean;
};

const servicesMock: Service[] = [
  {
    id: '109a3495-f8be-4317-9357-f4f5aefa97ab',
    title: 'Passear com os cães',
    description: 'Passear com os cães as segundas, quartas e sexta-feiras',
  },
  {
    id: '21c4dd16-5ee8-4d29-a4d8-a1cb708166fc',
    title: 'Soltar os cães',
    description: 'Soltar os cães no parquinho',
  },
  {
    id: '07a25ac0-00d7-4751-a43c-66e65322e55b',
    title: 'Passear com os gatos',
    description: 'Passear com os gatos as segundas, quartas e sexta-feiras',
  },
  {
    id: 'f35f0c49-ed79-48ce-ae1b-e3d72543edd6',
    title: 'Alimentar os cães',
    description: 'Alimentar os cães as manhãs e fim da tarde',
  },
  {
    id: 'f9275fd9-62f7-4578-be2e-00df3e12df3a',
    title: 'Alimentar os gatos',
    description: 'Alimentar os gatos as manhãs e fim da tarde',
  },
  {
    id: '66ab636a-cce2-489f-a295-330873e36a74',
    title: 'Comprar medicamentos',
    description:
      'Sair para comprar os medicamentos necessários para os animais que precisam',
  },
  {
    id: '47e5c5fa-d5e7-4112-b1fb-01ec0920db44',
    title: 'Brincar com os cães',
    description: 'Sair para o parquinho para brincar com os cães',
  },
];

const INITIAL_STATE = (): VoluntariesModuleState => ({
  voluntaries: [],
  isLoading: false,
});

const voluntariesModule: Module<VoluntariesModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getVoluntaries: (state) => state.voluntaries,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchVoluntaries({ commit }) {
      commit('setIsLoading', true);

      // const response = await voluntariesRequests.getAll();

      const mock: Voluntary[] = [
        {
          id: '78759cba-4c30-4c44-9e0d-dad0fe883caf',
          name: 'Gabrielly Maitê Helena',
          cpf: '03159971414',
          phone: '95988385230',
          email: 'gabriellymaitehelenalopes@negleribeiro.com',
          services: [servicesMock[0], servicesMock[1], servicesMock[2]],
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
        {
          id: '162b3db3-8ca5-452d-8758-e618d1ea2b8b',
          name: 'Sérgio Cauã Caldeira',
          cpf: '88805372617',
          phone: '91999628139',
          email: 'sergiocauagaelcaldeira_@santarte.com',
          services: [servicesMock[3], servicesMock[4]],
          address: {
            cep: '13802-456',
            street: 'Travessa Guajará 8',
            number: 817,
            complement: '',
            district: 'Ariramba (Mosqueiro)',
            city: 'Belém',
            state: 'PA',
          },
        },
        {
          id: '78759cba-4c30-4c44-9e0d-dad0fe883caf',
          name: 'Iago Carlos Enrico da Paz',
          cpf: '71343157200',
          phone: '8637660638',
          email: 'iiagocarlosenricodapaz@moderna.com.br',
          services: [servicesMock[0], servicesMock[1], servicesMock[6]],
          address: {
            cep: '64073-115',
            street: 'Rua Quatro',
            number: 189,
            complement: '',
            district: 'Uruguai',
            city: 'Teresina',
            state: 'PI',
          },
        },
      ];

      setTimeout(() => {
        commit('setVoluntaries', mock);
        commit('setIsLoading', false);
      }, 750);
    },

    async addVoluntary(_, voluntary: Omit<APIVoluntary, 'id'>) {
      const { status, data } = await voluntariesRequests.add(voluntary);

      return {
        status: status,
        message:
          status === 201
            ? 'Voluntário cadastrado com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteVoluntary(_, voluntaryId: string) {
      const response = await voluntariesRequests.remove(voluntaryId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateVoluntary(_, voluntary: APIVoluntary) {
      const { status, data } = await voluntariesRequests.update(voluntary);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setVoluntaries(state, payload: Voluntary[]) {
      state.voluntaries = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default voluntariesModule;
