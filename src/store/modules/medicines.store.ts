import { Medicine, APIMedicine } from '@/@types/Medicines';
import { medicinesRequests } from '@/services/api/requests';
import { convertAPIMedicinesToMedicines } from '@/utils/converters';
import { Module } from 'vuex';

type MedicinesModuleState = {
  medicines: Medicine[];
  isLoading: boolean;
};

const INITIAL_STATE = (): MedicinesModuleState => ({
  medicines: [],
  isLoading: false,
});

const medicinesModule: Module<MedicinesModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getMedicines: (state) => state.medicines,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchMedicines({ commit }) {
      commit('setIsLoading', true);

      const response = await medicinesRequests.getAll();

      commit(
        'setMedicines',
        convertAPIMedicinesToMedicines(response.data.data)
      );
      commit('setIsLoading', false);
    },

    async addMedicine(_, medicine: Omit<APIMedicine, 'id'>) {
      const { status, data } = await medicinesRequests.add(medicine);

      return {
        status: status,
        message:
          status === 201
            ? 'Medicamento cadastrado com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteMedicine(_, medicineId: string) {
      const response = await medicinesRequests.remove(medicineId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateMedicine(_, medicine: APIMedicine) {
      const { status, data } = await medicinesRequests.update(medicine);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setMedicines(state, payload: Medicine[]) {
      state.medicines = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default medicinesModule;
