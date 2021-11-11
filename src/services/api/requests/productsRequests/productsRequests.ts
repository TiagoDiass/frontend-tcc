import { APIProduct } from '@/@types/Products';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const resource = '/products';

/**
 * Request to get all the products
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIProduct[]>>> => {
  return api.get(resource);
};

/**
 * Request to get a product by its id
 */
const getById = async (
  productId: string
): Promise<AxiosResponse<APIResponseModel<APIProduct | null>>> => {
  return api.get(`${resource}/${productId}`);
};

/**
 * Request to create a product
 */
const add = (
  product: Omit<APIProduct, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIProduct | null>>> => {
  return api.post(`${resource}/create`, product);
};

/**
 * Request to remove a product
 */
const remove = (
  productId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`${resource}/delete/${productId}`);
};

/**
 * Request to update a product
 */
const update = (
  product: APIProduct
): Promise<AxiosResponse<APIResponseModel<APIProduct | null>>> => {
  return api.put(`${resource}/update/${product.id}`, product);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
