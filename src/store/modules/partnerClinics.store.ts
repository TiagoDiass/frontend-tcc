import { APIPartnerClinic, PartnerClinic } from '@/@types/PartnerClinics';
import { partnerClinicsRequests } from '@/services/api/requests';
import { Module } from 'vuex';

type PartnerClinicsModuleState = {
  clinics: PartnerClinic[];
  isLoading: boolean;
};

const INITIAL_STATE = (): PartnerClinicsModuleState => ({
  clinics: [] as PartnerClinic[],
  isLoading: false,
});

const partnerClinicsModule: Module<PartnerClinicsModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getClinics: (state) => state.clinics,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchClinics({ commit }) {
      commit('setIsLoading', true);

      const response = await partnerClinicsRequests.getAll();

      commit('setClinics', response.data.data);
      commit('setIsLoading', false);
    },

    async addClinic(_, clinic: Omit<APIPartnerClinic, 'id'>) {
      const { status, data } = await partnerClinicsRequests.add(clinic);

      return {
        status: status,
        message:
          status === 201
            ? 'Clínica parceira cadastrada com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteClinic(_, clinicId: string) {
      const response = await partnerClinicsRequests.remove(clinicId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateClinic(_, clinic: APIPartnerClinic) {
      const { status, data } = await partnerClinicsRequests.update(clinic);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setClinics(state, payload: PartnerClinic[]) {
      state.clinics = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default partnerClinicsModule;
