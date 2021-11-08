import { APIAnimal } from '@/@types/Animals';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const getAll = (): Promise<AxiosResponse<APIResponseModel<APIAnimal[]>>> => {
  return api.get('/animals');
};

const add = (
  animal: Omit<APIAnimal, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIAnimal | null>>> => {
  return api.post('/animals/create', animal);
};

export default {
  getAll,
  add,
};
