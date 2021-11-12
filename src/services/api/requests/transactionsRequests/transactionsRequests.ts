import { APITransaction } from '@/@types/Transactions';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const resource = '/transactions';

/**
 * Request to get all the transactions
 */
const getAll = (): Promise<
  AxiosResponse<APIResponseModel<APITransaction[]>>
> => {
  return api.get(resource);
};

/**
 * Request to get a transaction by its id
 */
const getById = async (
  transactionId: string
): Promise<AxiosResponse<APIResponseModel<APITransaction | null>>> => {
  return api.get(`${resource}/${transactionId}`);
};

/**
 * Request to create a transaction
 */
const add = (
  transaction: Omit<APITransaction, 'id'>
): Promise<AxiosResponse<APIResponseModel<APITransaction | null>>> => {
  return api.post(`${resource}/create`, transaction);
};

/**
 * Request to remove a transaction
 */
const remove = (
  transactionId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`${resource}/delete/${transactionId}`);
};

/**
 * Request to update a transaction
 */
const update = (
  transaction: APITransaction
): Promise<AxiosResponse<APIResponseModel<APITransaction | null>>> => {
  return api.put(`${resource}/update/${transaction.id}`, transaction);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
