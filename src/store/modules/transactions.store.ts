import { APITransaction, Transaction } from '@/@types/Transactions';
import { transactionsRequests } from '@/services/api/requests';
import { convertAPITransactionsToTransactions } from '@/utils/converters';
import { Module } from 'vuex';

type TransactionsModuleState = {
  transactions: Transaction[];
  isLoading: boolean;
};

const INITIAL_STATE = (): TransactionsModuleState => ({
  transactions: [],
  isLoading: false,
});

const transactionsModule: Module<TransactionsModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getTransactions: (state) => state.transactions,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchTransactions({ commit }) {
      commit('setIsLoading', true);

      const response = await transactionsRequests.getAll();

      commit(
        'setTransactions',
        convertAPITransactionsToTransactions(response.data.data)
      );
      commit('setIsLoading', false);
    },

    async addTransaction(_, transaction: Omit<APITransaction, 'id'>) {
      const { status, data } = await transactionsRequests.add(transaction);

      return {
        status: status,
        message:
          status === 201
            ? 'Transação registrada com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteTransaction(_, transactionId: string) {
      const response = await transactionsRequests.remove(transactionId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateTransaction(_, transaction: APITransaction) {
      const { status, data } = await transactionsRequests.update(transaction);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setTransactions(state, payload: Transaction[]) {
      state.transactions = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default transactionsModule;
