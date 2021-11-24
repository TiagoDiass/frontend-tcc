import { APIHelpCase } from '@/@types/HelpCases';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const resource = '/help-cases';

/**
 * Request to get all the helpCases
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIHelpCase[]>>> => {
  return api.get(resource);
};

/**
 * Request to get a helpCase by its id
 */
const getById = async (
  helpCaseId: string
): Promise<AxiosResponse<APIResponseModel<APIHelpCase | null>>> => {
  return api.get(`${resource}/${helpCaseId}`);
};

/**
 * Request to create a helpCase
 */
const add = (
  helpCase: Omit<APIHelpCase, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIHelpCase | null>>> => {
  return api.post(`${resource}/create`, helpCase);
};

/**
 * Request to remove a helpCase
 */
const remove = (
  helpCaseId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`${resource}/delete/${helpCaseId}`);
};

/**
 * Request to update a helpCase
 */
const update = (
  helpCase: APIHelpCase
): Promise<AxiosResponse<APIResponseModel<APIHelpCase | null>>> => {
  return api.put(`${resource}/update/${helpCase.id}`, helpCase);
};

/**
 * @service Serviço de casos de ajuda
 */
export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
