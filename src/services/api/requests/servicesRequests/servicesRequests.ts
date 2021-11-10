import { APIService } from '@/@types/Services';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const resource = '/services';

/**
 * Request to get all the services
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIService[]>>> => {
  return api.get(resource);
};

/**
 * Request to get a service by its id
 */
const getById = async (
  serviceId: string
): Promise<AxiosResponse<APIResponseModel<APIService | null>>> => {
  return api.get(`${resource}/${serviceId}`);
};

/**
 * Request to create a service
 */
const add = (
  service: Omit<APIService, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIService | null>>> => {
  return api.post(`${resource}/create`, service);
};

/**
 * Request to remove a service
 */
const remove = (
  serviceId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`${resource}/delete/${serviceId}`);
};

/**
 * Request to update a service
 */
const update = (
  service: APIService
): Promise<AxiosResponse<APIResponseModel<APIService | null>>> => {
  return api.put(`${resource}/update/${service.id}`, service);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
