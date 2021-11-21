import { APIVoluntary } from '@/@types/Voluntaries';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

/**
 * Request to get all the voluntaries
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIVoluntary[]>>> => {
  return api.get('/voluntaries');
};

/**
 * Request to get a voluntary by its id
 */
const getById = async (
  voluntaryId: string
): Promise<AxiosResponse<APIResponseModel<APIVoluntary | null>>> => {
  return api.get(`/voluntaries/${voluntaryId}`);
};

/**
 * Request to create a voluntary
 */
const add = (
  voluntary: Omit<APIVoluntary, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIVoluntary | null>>> => {
  return api.post('/voluntaries/create', voluntary);
};

/**
 * Request to remove a voluntary
 */
const remove = (
  voluntaryId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`/voluntaries/delete/${voluntaryId}`);
};

/**
 * Request to update a voluntary
 */
const update = (
  voluntary: APIVoluntary
): Promise<AxiosResponse<APIResponseModel<APIVoluntary | null>>> => {
  return api.put(`/voluntaries/update/${voluntary.id}`, voluntary);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
