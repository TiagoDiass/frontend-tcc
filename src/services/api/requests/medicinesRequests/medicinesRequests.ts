import { APIMedicine } from '@/@types/Medicines';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const resource = '/medicines';

/**
 * Request to get all the medicines
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIMedicine[]>>> => {
  return api.get(resource);
};

/**
 * Request to get a medicine by its id
 */
const getById = async (
  medicineId: string
): Promise<AxiosResponse<APIResponseModel<APIMedicine | null>>> => {
  return api.get(`${resource}/${medicineId}`);
};

/**
 * Request to create a medicine
 */
const add = (
  medicine: Omit<APIMedicine, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIMedicine | null>>> => {
  return api.post(`${resource}/create`, medicine);
};

/**
 * Request to remove a medicine
 */
const remove = (
  medicineId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`${resource}/delete/${medicineId}`);
};

/**
 * Request to update a medicine
 */
const update = (
  medicine: APIMedicine
): Promise<AxiosResponse<APIResponseModel<APIMedicine | null>>> => {
  return api.put(`${resource}/update/${medicine.id}`, medicine);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
