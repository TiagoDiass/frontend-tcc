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

      const response = await helpCasesRequests.getAll();

      commit('setHelpCases', response.data.data);
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
