import { APITransaction, Balance, Transaction } from '@/@types/Transactions';
import { transactionsRequests } from '@/services/api/requests';
import { convertAPITransactionsToTransactions } from '@/utils/converters';
import { Module } from 'vuex';

type TransactionsModuleState = {
  transactions: Transaction[];
  balance: Balance;
  isLoading: boolean;
};

const INITIAL_STATE = (): TransactionsModuleState => ({
  transactions: [],
  balance: {
    total: 0,
    entries: 0,
    withdraws: 0,
  },
  isLoading: false,
});

const transactionsModule: Module<TransactionsModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getTransactions: (state) => state.transactions,
    getIsLoading: (state) => state.isLoading,
    getBalance: (state) => state.balance,
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

    async fetchBalance({ commit }) {
      commit('setIsLoading', true);

      const response = await transactionsRequests.getBalanceTotalizers();

      commit('setBalance', response.data.data);
      commit('setIsLoading', false);
    },
  },

  mutations: {
    setTransactions(state, payload: Transaction[]) {
      state.transactions = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },

    setBalance(state, payload: Balance) {
      state.balance = payload;
    },
  },
};

export default transactionsModule;
