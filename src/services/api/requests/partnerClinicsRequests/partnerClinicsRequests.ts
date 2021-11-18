import { APIPartnerClinic } from '@/@types/PartnerClinics';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const resource = '/partner-clinics';

/**
 * Request to get all the partnerClinics
 */
const getAll = (): Promise<
  AxiosResponse<APIResponseModel<APIPartnerClinic[]>>
> => {
  return api.get(resource);
};

/**
 * Request to get a partnerClinic by its id
 */
const getById = async (
  partnerClinicId: string
): Promise<AxiosResponse<APIResponseModel<APIPartnerClinic | null>>> => {
  return api.get(`${resource}/${partnerClinicId}`);
};

/**
 * Request to create a partnerClinic
 */
const add = (
  partnerClinic: Omit<APIPartnerClinic, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIPartnerClinic | null>>> => {
  return api.post(`${resource}/create`, partnerClinic);
};

/**
 * Request to remove a partnerClinic
 */
const remove = (
  partnerClinicId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`${resource}/delete/${partnerClinicId}`);
};

/**
 * Request to update a partnerClinic
 */
const update = (
  partnerClinic: APIPartnerClinic
): Promise<AxiosResponse<APIResponseModel<APIPartnerClinic | null>>> => {
  return api.put(`${resource}/update/${partnerClinic.id}`, partnerClinic);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
