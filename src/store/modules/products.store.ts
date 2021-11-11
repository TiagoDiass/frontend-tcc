import { APIProduct, Product } from '@/@types/Products';
import { productsRequests } from '@/services/api/requests';
import { convertAPIProductsToProducts } from '@/utils/converters';
import { Module } from 'vuex';

type ProductsModuleState = {
  products: Product[];
  isLoading: boolean;
};

const INITIAL_STATE = (): ProductsModuleState => ({
  products: [],
  isLoading: false,
});

const productsModule: Module<ProductsModuleState, null> = {
  namespaced: true,
  state: INITIAL_STATE(),

  getters: {
    getProducts: (state) => state.products,
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    async fetchProducts({ commit }) {
      commit('setIsLoading', true);

      const response = await productsRequests.getAll();

      commit('setProducts', convertAPIProductsToProducts(response.data.data));
      commit('setIsLoading', false);
    },

    async addProduct(_, product: Omit<APIProduct, 'id'>) {
      const { status, data } = await productsRequests.add(product);

      return {
        status: status,
        message:
          status === 201
            ? 'Produto cadastrado com sucesso'
            : data.errors?.join(', '),
      };
    },

    async deleteProduct(_, productId: string) {
      const response = await productsRequests.remove(productId);

      return {
        status: response.status,
        message: response.data.data,
      };
    },

    async updateService(_, product: APIProduct) {
      const { status, data } = await productsRequests.update(product);

      return {
        status,
        message: data.message,
      };
    },
  },

  mutations: {
    setProducts(state, payload: Product[]) {
      state.products = payload;
    },

    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
  },
};

export default productsModule;
