import { APIHelpCase, HelpCase } from '@/@types/HelpCases';
import { helpCasesRequests } from '@/services/api/requests';
import { Module } from 'vuex';

type HelpCasesModuleState = {
  helpCases: HelpCase[];
  isLoading: boolean;
};

const INITIAL_STATE = (): HelpCasesModuleState => ({
  helpCases: [] as HelpCase[],
  isLoading: false,
});

const helpCasesModule: Module<HelpCasesModuleState, null> = {
  namespaced: true,

  state: INITIAL_STATE(),

  getters: {
    getHelpCases: (state) => state.helpCases,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchHelpCases({ commit }) {
      commit('setIsLoading', true);

      // const response = await helpCasesRequests.getAll();
      // commit('setHelpCases', response.data.data);

      const mock: APIHelpCase[] = [
        {
          id: '3ddb62e8-f41a-4820-9939-faf2c21b5f94',
          title: 'Cadelinha atropelada',
          description: `Uma cadelinha chamada Mel foi atropelada no cruzamento da décima com a quarta avenida, 
            e agora, ela precisará passar por cirurgia para que possa se recuperar. 
            O valor para ajuda na cirurgia é de R$ 200,00.`,
          pictures: [],
          poolMoneyUrl: 'https://www.facebook.com/tiago.costadias/',
        },
        {
          id: '3ddb62e8-f41a-4820-9939-faf2c21b5f95',
          title: 'Doações',
          description: `Como em todo mês, estamos precisando de doações para conseguir arcar
            com os custos, alimentar os animais, comprar seus remédios, etc.
            Você pode doar o quanto quiser. :)`,
          pictures: [],
          poolMoneyUrl: undefined,
        },
        {
          id: '3ddb62e8-f41a-4820-9939-faf2c21b5f96',
          title: 'Cãozinho encontrado abandonado',
          description: `Um cãozinho foi encontrado abandonado no bairro Jardim Leopoldo, próximo ao centro
            da cidade, estamos tratando dele e ele está procurando por um novo lar. 
            Ele é muito dócil e brincalhão, aparenta ter 2 anos de idade.`,
          pictures: ['https://source.unsplash.com/720x1280/?dog'],
          poolMoneyUrl: undefined,
        },
        {
          id: '3ddb62e8-f41a-4820-9939-faf2c21b5f97',
          title: 'Animais para adoção',
          description: `Como todo mês, estamos com muitos animais que precisam encontrar um novo lar.
            Temos 7 cães e 3 gatinhos que estão esperando alguém adotá-los. Já pensou em adotar um novo pet?`,
          pictures: [
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?dog',
            'https://source.unsplash.com/1400x900/?kitty',
            'https://source.unsplash.com/1400x900/?kitty',
            'https://source.unsplash.com/1400x900/?kitty',
          ],
          poolMoneyUrl: undefined,
        },
        {
          id: '3ddb62e8-f41a-4820-9939-faf2c21b5f98',
          title: 'Gatinho resgatado',
          description: `Resgatamos um gatinho chamado Luíz de um lar que o maltratava. Ele está ansioso por conhecer seu novo lar. Quer adotá-lo?`,
          pictures: [
            'https://www.artfulpawsphotography.com/wp-content/uploads/2019/08/fairfax-cat-photographer-studio-cat-photo-session-9390.jpg',
            'https://www.artfulpawsphotography.com/wp-content/uploads/2019/08/fairfax-cat-photographer-studio-cat-photo-session-9705.jpg',
          ],
          poolMoneyUrl: undefined,
        },
      ];

      commit('setHelpCases', mock);
      commit('setIsLoading', false);
    },

    async addHelpCase(_, helpCase: Omit<APIHelpCase, 'id'>) {
      const { status, data } = await helpCasesRequests.add(helpCase);

      return {
        status: status,
        message:
          status === 201
            ? 'Caso de ajuda cadastrado com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteHelpCase(_, helpCaseId: string) {
      const response = await helpCasesRequests.remove(helpCaseId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateHelpCase(_, helpCase: APIHelpCase) {
      const { status, data } = await helpCasesRequests.update(helpCase);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setHelpCases(state, payload: HelpCase[]) {
      state.helpCases = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default helpCasesModule;
