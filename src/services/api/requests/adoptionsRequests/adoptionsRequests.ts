import { APIAdoption } from '@/@types/Adoptions';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

/**
 * Request to get all the adoptions
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIAdoption[]>>> => {
  return api.get('/adoptions');
};

/**
 * Request to get an adoption by its id
 */
const getById = async (
  adoptionId: string
): Promise<AxiosResponse<APIResponseModel<APIAdoption | null>>> => {
  return api.get(`/adoptions/${adoptionId}`);
};

/**
 * Request to create an adoption
 */
const add = (
  adoption: Omit<APIAdoption, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIAdoption | null>>> => {
  return api.post('/adoptions/create', adoption);
};

/**
 * Request to remove an adoption
 */
const remove = (
  adoptionId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`/adoptions/delete/${adoptionId}`);
};

/**
 * Request to update an adoption
 */
const update = (
  adoption: APIAdoption
): Promise<AxiosResponse<APIResponseModel<APIAdoption | null>>> => {
  return api.put(`/adoptions/update/${adoption.id}`, adoption);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
