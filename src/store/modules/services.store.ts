import { APIService, Service } from '@/@types/Services';
import { servicesRequests } from '@/services/api/requests';
import { convertAPIServicesToServices } from '@/utils/converters';
import { Module } from 'vuex';

type ServicesModuleState = {
  services: Service[];
  isLoading: boolean;
};

const INITIAL_STATE = (): ServicesModuleState => ({
  services: [] as Service[],
  isLoading: false,
});

const servicesModule: Module<ServicesModuleState, null> = {
  namespaced: true,

  state: INITIAL_STATE(),

  getters: {
    getServices: (state) => state.services,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchServices({ commit }) {
      commit('setIsLoading', true);

      const response = await servicesRequests.getAll();

      commit('setServices', convertAPIServicesToServices(response.data.data));
      commit('setIsLoading', false);
    },

    async addService(_, service: Omit<APIService, 'id'>) {
      const { status, data } = await servicesRequests.add(service);

      return {
        status: status,
        message:
          status === 201
            ? 'Serviço cadastrado com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteService(_, serviceId: string) {
      const response = await servicesRequests.remove(serviceId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateService(_, service: APIService) {
      const { status, data } = await servicesRequests.update(service);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setServices(state, payload: Service[]) {
      state.services = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default servicesModule;
